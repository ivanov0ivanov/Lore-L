// Подключение модулей
const path = require('path'),
  errors = require(path.join(__dirname, 'errors')),
  User = require(path.join(__dirname, '..', '..', 'models', 'user')).User,
  sendMail = require(path.join(__dirname, '..', '..', 'other', 'mail')),
  bcrypt = require('bcrypt')


// функция временной блокировки
exports.backoff = async (req, res, next) => {
	const {
		username
	} = req.body
	if (!username)
		return next() // not our dealio
	const user = await User.findOne({ username })
	if (!user)
		return next() // not our dealio


	// пользователь полностью заблокирован до активации через почту
	if (user.blocked)
		return res.status(403).json({
			err: 'accountBlocked',
			message: errors.authentication.accountBlocked
		})

	let _series = 0
	let _tries = 1
	let _tempBlocked = user._tempBlocked

	// пользователь временно заблокирован
	if (user._tempBlocked)
		// время блокировки еще не истекло
		if (user._unblockTime > Date.now())
			return res.status(400).json({
				err: 'tooManyTries',
				message: errors.authentication.tooManyTries
			})
		// истекло
		else {
			// увеличиваем кол-во неудачных серий попыток логина
			_series = 1
			// обнуляем кол-во попыток в текущей сессии
			_tries = 0
			// отключаем временную блокировку
			_tempBlocked = false
		}

	// счетчик монго, инициализируем указывая надо ли поднять кол-во серий
	let $inc = { _series }
	// остальные данные для обновления, указываем надо ли снять блокировку
	let $set = { _tempBlocked }

	// нужно ли увеличивать кол-во попыток или обнулить его
	if (_tries === 1)
		$inc._tries = 1
	else
		$set._tries = 0

	// обновляем пользователя
	const updatedUser  = await User.findOneAndUpdate({ username }, {
		$inc,
		$set
	}, { new: true })


	// если кол-во попыток в сесии превысило 4
	if (updatedUser._tries > 4) {
		// если пользователь раньше не блокировался
		if (!updatedUser._series) {
			// ставим блок на час и отдаем 400 ошибку
			const unblockTime = (Date.now() + (1000 * 60 /* 3600 * 1 */)).toString()
			const recoveryToken = encodeURIComponent(await bcrypt.hash(unblockTime, 1))
			const user = await User.findOneAndUpdate({ username }, { $set: {
				_tempBlocked: true,
				_unblockTime: unblockTime,
				recoveryToken
			}}, { new: true })
			try {
				// пробуем отправить письмо
				// const mailPromise = sendMail(user.email, { key: 'recovery', data: { recoveryToken, user }})
				//  ТЕСТ: не ждем обещания на случай если нода ждет его даже без активной рефки
				// await mailPromise;
				// ТЕСТ: ждем обещания с пустым колбэком
				// mailPromise.then(() => console.log(1))
			} catch (err) {
				console.error(err)
			}
			return res.status(400).json({
				err: 'tooManyTries',
				message: errors.authentication.tooManyTries
			})
		} else {
			// если это вторая серия неудачных попыток, ставим постоянный блок, который снимается вручную (по ссылке на почте)
			const blockTime = Date.now() + Math.floor(Math.random() * 1000).toString()
			const recoveryToken = encodeURIComponent(await bcrypt.hash(blockTime, 1))
			await User.findOneAndUpdate({ username }, { $set: {
				blocked: true,
				blockTime,
				recoveryToken
			}})
			try {
				// пробуем отправить письмо
				const mailPromise = sendMail(user.email, { key: 'recovery', data: { recoveryToken, user }})
				//  ТЕСТ: не ждем обещания на случай если нода ждет его даже без активной рефки
				// await mailPromise;
				// ТЕСТ: ждем обещания с пустым колбэком
				// mailPromise.then(() => console.log(1))
			} catch (err) {
				console.error(err)
			}
			// и отправляем 403 ошибку
			return res.status(403).json({
				err: 'accountBlocked',
				message: errors.authentication.accountBlocked
			})
		}
	}
	// ничего не делаем и отдаем запрос пасспорту
	next()
}

exports.laidoff = (user) => {
	const { username } = user
	return User.findOneAndUpdate({ username }, { $set: {
		_tries: 0,
		_series: 0,
		_tempBlocked: false
	}}, { new: true })
}

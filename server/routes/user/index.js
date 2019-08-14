// Подключение модулей
const path = require('path'),
  router = require('express').Router(),
  User = require(path.join(__dirname, '..', '..', 'models', 'user')).User,
  { backoff } = require(path.join(__dirname, 'backoff')),
  verifyCaptcha = require(path.join(__dirname, 'verifyCaptcha')),
  signup = require(path.join(__dirname, 'signup')),
  signin = require(path.join(__dirname, 'signin'))


// небольшая функция проверки наличия пользователя
router.get('/', async (req, res, next) => {
	if (!req.query.test)
		return next()
	const user = await User.findOne({ username: req.query.test })
	return res.status(200).json({ exists: Boolean(user) })
})

// разблокировка, стоит вынести в отдельный модуль..
router.get('/unblock/:token', async (req, res) => {
	const recoveryToken = encodeURIComponent(req.params.token)
	if (!recoveryToken)
		return res.end()
	const user = await User.findOne({ recoveryToken })
	if (user && recoveryToken === user.recoveryToken)
		User.findOneAndUpdate({ _id: user._id }, { $set: {
			recoveryToken: null,
			_tempBlocked: null,
			blocked: null,
			blockTime: null,
			_tries: 0,
			_series: 0,
		} })
	return res.redirect('/signin')
})

// проверяем капчу
// регистрируем пользователя
router.post('/signup', verifyCaptcha, signup)

// проверяем капчу,
// проверяем что пользователь не заблокирован,
// проверяем данные
router.post('/signin', verifyCaptcha, backoff, signin)


// Экспорт
module.exports = router

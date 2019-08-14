// Подключение модулей
const path = require('path'),
  User = require(path.join(__dirname, '..', '..', 'models', 'user')).User,
  createToken = require(path.join(__dirname, '..', '..', 'other', 'createToken')),
  errors = require(path.join(__dirname, 'errors'))


const signupHandler = async (req, res) => {
	const {
		username, password, passwordRepeat
	} = req.body
	// валидация данных перед сохранением
	// по большей части только для ботов, клиентская форма имеет встроенную валидацию
	if (!username || !password || !passwordRepeat)
		return res.status(400).json({
			err: 'emptyFields',
			message: errors.validation.emptyFields
		})

	if (req.body.password !== req.body.passwordRepeat)
		return res.status(400).json({
			err: 'passwordRepeatMismatch',
			message: errors.validation.passwordRepeatMismatch
		})

	const existingUser = await User.findOne({ username })
	if (existingUser)
		return res.status(409).json({
			err: 'userExists',
			message: errors.authentication.userExists
		})

	try {
		// мы отправляем простой пароль потому что шифрованием занимается сама модель пользователя
		await User.add({ username, password })
	} catch (err) {
		// сюда можно добавить нормальный логгер на случай ошибок с базой
		console.warn(err)
		return res.status(500).json({
			err: 'db',
			message: errors.db
		})
	}
	// отправляем пользователя
	return res.status(200).json({
		message: 'success',
		user: {
			username: username,
			token: createToken({ username })
		}
	})
}


// Экспорт
module.exports = signupHandler

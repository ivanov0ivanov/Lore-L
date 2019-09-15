// Подключение модулей
const path = require('path'),
  errors = require(path.join(__dirname, 'errors'))


// проверка правильности капчи
const verifyCaptcha = (req, res, next) => {
	if (!req.body.captcha || req.body.captcha !== req.session.captcha)
		return res.status(400).json({
			err: 'wrongCaptcha',
			message: errors.validation.wrongCaptcha
		})
	if (req.body.captcha === req.session.captcha)
		return next()
}


// Экспорт
module.exports = verifyCaptcha

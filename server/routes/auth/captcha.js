// Подключаемы модули
const _captcha = require('svg-captcha')


// Создание капчи
exports.get = (req, res) => {
  // Блок переменных
  const captcha = _captcha.createMathExpr({
      size: 5, 
      noise: 3, 
      ignoreChars: 'a-z'
    })

  req.session.captcha = captcha.text // Сохранение капчи
  res.type('svg').status(200).send(captcha.data) // Отправка на клиент
}

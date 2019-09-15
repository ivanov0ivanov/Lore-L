// Подключение модулей
const path = require('path')


// Перевод всех неизвестных путей на SPA - клиентский роутер
module.exports = (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', '..', 'dist', 'index.html'))
}

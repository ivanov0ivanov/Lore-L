// Подключаемые модули
let url = require('url'),
  querystring = require('querystring')


// Обработчик
module.exports = (req, res, next) => {
  // Блок переменных
  let urlParse = url.parse(req.url),  // Парсим URL
    urlData = { // Объект для удобного хранения данных
      params: querystring.parse(url.parse(req.url).query), // Объект со структурированными параметрами
      pathname: urlParse.pathname,  // Путь
      href: urlParse.href // Полный адрес
    }

  req.urlData = urlData // Сохраняем полученные данные
  next() // Передаём управление дальше
}

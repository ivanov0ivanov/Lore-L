// Подключение модулей
const path = require('path'),
  jwt = require('jsonwebtoken'),
  config = require(path.join(__dirname, '..', 'config'))


// Блок переменных
const jwtSecret = config.secrets.jwt


// Создание токена
module.exports = (data) => jwt.sign(data, jwtSecret)

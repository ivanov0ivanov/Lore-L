// Подключаемые модули
const path = require('path'), 
  mongoose = require('mongoose'),
  config = require(path.join(__dirname, '..', 'config'))


// Подключение
mongoose.connect(config.mongodb.uri, config.mongodb.options)


// Экспорт
module.exports = mongoose

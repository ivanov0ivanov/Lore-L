// Подключение модулей
const path = require('path'),
  passport = require(path.join(__dirname, '..', 'libs', 'passport'))

// Обработка запросов
module.exports = (app) => {
  // Капча
  app.route('/getCaptcha')
    .get(require(path.join(__dirname, 'auth', 'captcha')).get)


  // Пользователь
  app.use('/user', require(path.join(__dirname, 'user')))


  // Авторизация через внешние сервисы
  app.use('/oauth', require(path.join(__dirname, 'oauth')))


  // Токен-авторизация
  app.route('/protected')
    .get(passport.authenticate('jwt', {session: false}), require(path.join(__dirname, 'auth', 'protected')).get)


  // Решения
  app.route('/solutions')
    .get(require(path.join(__dirname, 'solutions')).get) // Получение решений
    .post(require(path.join(__dirname, 'solutions')).post) // Добавление решения

  // Решение
  app.route('/solutions/:id')
    .get(require(path.join(__dirname, 'solution')).get) // Получение решения
    .post(require(path.join(__dirname, 'solution')).post) // Отправка решения

  // Обработчик неизвестных запросов
  app.route('*')
    .get(require(path.join(__dirname, 'other')))
}

// Подключение модулей
const path = require('path'),
    express = require('express'),
    session = require('express-session'),
    mongoose = require(path.join(__dirname, 'libs', 'mongoose')),
    MongoStore = require('connect-mongo')(session),
    passport = require(path.join(__dirname, 'libs', 'passport')),
    dotenv = require('dotenv').config(),
    config = require(path.join(__dirname, 'config')),
    _captcha = require('svg-captcha'),
    body = require('body-parser'),
    proxy = require(path.join(__dirname, 'routes', 'proxy'));

mongoose.Promise = require('bluebird');


// Блок переменных
const app = express(),
    port = config.port,
    secrets = config.secrets,
    dbUrl = config.mongodb.uri;

// Настройка
app.use('/open_project', proxy);
app.use(body.urlencoded({ // Для нормального чтения данных из форм
    extended: true
}));
app.use(express.json()); // Для нормального чтения JSON
app.use(express.static(path.join(__dirname, '..', 'dist'))); // Статика
app.use(session({ // Сессии
    secret: secrets.session,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        url: dbUrl
    })
    // нужно будет включить при переходе на https
    // cookie: { secure: true }
}));
app.use(passport.initialize());  // Инициализация passport.js

// Миддлверы
app.use(require(path.join(__dirname, 'middleware', 'readUrlParams'))); // Парсинг параметров URL'а


// Роутинг
require(path.join(__dirname, 'routes'))(app);


// Установка слушателя на порт
app.listen(port, '127.0.0.1', () => {
    console.log(`Listening on ${port}`)
});

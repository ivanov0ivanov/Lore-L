# loreland

## Project setup
```
npm install
```

## Server

Requires mongodb and either reverse proxy (apache, nginx) or 80 port access

1. set up .env:
  - APP_HOST=hostname for generating oauth callbacks, see server/config.js
  - PORT=app port (8080)
  - DB_URL=mongodb url (mongodb://localhost/loreland)
2. set up config:
  - session and jwt secrets
  - mail user and server settings
  - oauth data (client id, secret, cb url)

Для работы сервера требуется mongodb и обратная прокси (apache, nginx) или доступ к 80 порту

1. настроить .env:
- APP_HOST=hostname для создания callback ссылок для oauth, подробнее в server/config.js
- PORT=порт приложения (8080)
- DB_URL=ссылка для подключения к базе (mongodb://localhost/loreland)
2. настроить конфиг:
- секреты для сессии и jwt
- пользователь и сервер почты
- данные для oauth (client id, secret, cb url)

### Compiles and starts server and client for production
```
npm run server
```

### Compiles and starts server and client for development
```
npm run server-dev
```

Uses regular node process, might want to switch to pm2 or forever

### Compiles and hot-reloads client for development
```
npm run serve
```

### Compiles and minifies client for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

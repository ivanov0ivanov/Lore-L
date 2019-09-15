// Блок переменных
const host = process.env.APP_HOST || 'http://localhost:8080',
	port = process.env.PORT || 8080,
	dbUrl = process.env.DB_URL || 'mongodb://localhost/loreland';


// Набор конфигураций
module.exports = {
	"port": port,	// Порт
	"mongodb": { // Данные для подключения к БД
		"uri": dbUrl,
		"options": {
      "useCreateIndex": true,
			"useNewUrlParser": true,
			"useFindAndModify": false
    }
	},
	"secrets": {
		// сюда нужно вставит секреты - случайно сгенерированные пароли которые используется для шифрования\хеширования данных сессии и токенов
		"session": "THE SECRET",
		"jwt": "THE SECRET 2"
	},
	"mail": {

	},
	// пример настройки почты
	"_mail": {
		"account": {
			"user": "<mailing server login>",
			"password": "<mailing server password>",
			"from": "<from mail string>"
		},
		"server": {
			"host": "<mailing server host>",
			"port": 587,
			"secure": false
		}
	},
	// соц авторизация
	"oauth": {
		"github": {
			"app_name": "test",
			"home_url": host,
			"callback_url": `${host}/oauth/github-callback`,
			"client_id": "5d761c85f02ac2e67d11",
			"client_secret": "bfc0dcd4726cb077bd3c4499229662cb7a2a330b"
		},
		"_github": {
			"app_name": "test",
			"home_url": host,
			"callback_url": `${host}/oauth/github-callback`,
			"client_id": "ba1afc5a0dfab674f387",
			"client_secret": "cefdbc64388a2b2fb5facf13ca07856c93c2c985"
		},
		"google": {
			"app_name": "test",
			"home_url": "http://localhost:8080",
			"callback_url": `${host}/oauth/google-callback`,
			"client_id": "201942707487-0f33r46b0qbi51e82rck5cgie0qgn2ep.apps.googleusercontent.com",
			"client_secret": "XCd2H2wmFc5OY4SgqPjM6612"
		}
	}
}

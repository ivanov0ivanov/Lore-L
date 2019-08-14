// Блок переменных
const path = require('path'),
	bcrypt = require('bcrypt'),
	mongoose = require(path.join(__dirname, '..', 'libs', 'mongoose'))


// Блок переменных
const Schema = mongoose.Schema


// Создание схемы
const schema = new Schema({
	username: {	// Имя пользователя
		type: String,
    required: true,
		unique: true
	},
	hash: {	// Зашифрованный пароль
		type: String,
	},
	balance: { // Баланс
		type: Number,
		required: true,
		default: 0
	},
	rating: { // Рейтинг
		type: Number,
		required: true,
		default: 0
	},
	reputation: [{ // Репутация
		category: { // Категория
			type: String,	// Потом можно будет заменить на внешнюю ссылку к модели категорий
			required: true
		},
		value: { // Значение
			type: Number,
			required: true,
			default: 0
		}
	}],
	// Далее идут поля для oAuth
	google: {	// Google
		id: {
			type: String,
			unique: true
		},
		accessToken: {
			type: String
		},
		refreshToken: {
			type: String
		}
	},
	github: {	// GitHub
		id: {
			type: String,
			unique: true
		},
		accessToken: {
			type: String
		},
		refreshToken: {
			type: String
		}
	},
	// Подсчет числа попыток входа для предотвращения подбора пароля. После 3 попыток - временный блок
	_series: {
		type: Number,
		default: 0
	},
	_tries: {
		type: Number,
		default: 0
	},
	_tempBlocked: { // Индикатор временной блокировки
		type: Boolean,
		default: false
	},
	_unblockTime: { // Дата снятия временной блокировки
		type: Date
	},
	recoveryToken: { // Токен восстановления
		type: String
	},
	blocked: { // Индикатор перманентной блокировки
		type: Boolean,
		default: false
	},
	blockTime: { // ???
		type: Date
	}
}, {
	timestamps: true // Временные метки
})


// Проверка пароля
schema.methods.verifyPassword = async function (password) {
	return await bcrypt.compare(password, this.hash)
}


// Добавление пользователя
schema.statics.add = async function({username, password}) {
	// Получение модели
	let User = this
	
	// Формирование нового пользователя
	var user = new User({
		username: username,
		hash: await bcrypt.hash(password, Number(10)),
		reputation: [{category: 'дизайн'}, {category: 'разработка на JS'}]
	})

	// Сохранение
	return await user.save()
}

// Добавление пользователя с oauth
schema.statics.oauth = async function(profile, accessToken, refreshToken) {
	// Получаем модель
	let User = this

	// Формирование нового пользователя
	var user = new User({
		username: profile.username || profile.login || profile.id,
		[profile.provider]: {
			id: profile.id,
			accessToken,
			refreshToken
		}
	})

	// Сохранение
	return await user.save()
}


// Экспорт
exports.User = mongoose.model('User', schema)

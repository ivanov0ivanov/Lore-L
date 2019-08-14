//  объект ошибок которые могут быть отправлены клиенту
// на данный момент клиент никак не обрабатывает их
// (кроме неправильного логина/пароля)
module.exports = {
	validation: {
		'wrongCaptcha': '...'
	},
	authentication: {
		'userExists': 'user_exists',
		'wrongData': 'wrong_password',
		'tooManyTries': 'too_many_tries'
	}
}

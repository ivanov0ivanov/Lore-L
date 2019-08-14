// Подключение модулей
const path = require('path'),
  nodemailer = require("nodemailer"),
  config = require(path.join(__dirname, '..', 'config'))


// Блок переменных
let { account, server } = config.mail


// создатель транспортера - "соединения" с почтовым сервером
let _transport = null
const getTransport = async () => {
	// требование добавить почтовый аккаунт
	if (!account || !server) {
		console.warn(`Необходимо заполнить настройки почты в config.js
Требуется указать сервер (хост, порт, данные для авторизации)
и данные аккаунта для отправки (имя пользователя, пароль и строку-отправителя или полный почтовый адрес)
Иначе продолжится выполнение в тестовом режиме через ethereal.mail аккаунт`)
		account = await nodemailer.createTestAccount()
		return _transport || nodemailer.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			secure: false,
			auth: {
				user: account.user,
				pass: account.pass
			}
		})
	}
	return _transport || nodemailer.createTransport({
		...server,
		auth: {
			user: account.user,
			password: account.password,
		}
	})
}

// заглушка на случай если нужно будет создать шаблоны писем куда подставляются данные
// к примеру шаблон восстановления пароля - в него передается созданный код и письмо само формирует остальную разметку,
// так для отправки письма о восстановлении нужно просто вызвать sendMail с параметрами
/*
sendMail(user.email, {
	key: 'recovery', data: { recoveryToken: generateRecoveryToken(), subject: getLocaleSring('email.recovey.subject')
} })
или что-то подобное
*/
const templatesHTML = {
	recovery: (data) => `<p>Hi, ${data.user.username}!</p>
	<p>
		You account got blocked because of multiple unsuccessfull login attemps
	</p>
	<br />
	<p>
		But don't worry, just follow <a href="http://localhost:8080/user/unblock/${data.recoveryToken}">this link to unblock it</a>
	</p>`
}

const fillMail = (key, mail, data) => {
	let text = '', html = '';
	switch (key){
		case 'recovery':
		html = templatesHTML.recovery(data)
		// check that regex tho
		text = html.replace(/<(?:.|\n)*?>/gm, '');
		break
	}
	return {
		...mail,
		text,
		html
	}
}

const sendMail = async (to, { text, html, subject, key, data }) => {
	const transport = await getTransport()
	let mail = {
		from: account.from || `Loreland <${account.user}>`,
		to,
		subject
	}
	if (key)
		mail = fillMail(key, mail, data)
	else {
		mail.text = text
		mail.html = html
	}
	const info = await transport.sendMail(mail)
	// если работаем без реального аккаунта, отправить ссылку на пример в консоль
	if (!account || !server)
		console.log(nodemailer.getTestMessageUrl(info))
}


// Экспорт
module.exports = sendMail

// Подключаемые модули
const path = require('path'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  JwtStrategy = require('passport-jwt').Strategy,
  User = require(path.join(__dirname, '..', 'models', 'user')).User,
  config = require(path.join(__dirname, '..', 'config'))


// Блок переменных
const secrets = config.secrets


// Локальная стратегия авторизации
passport.use(new LocalStrategy((username, password, done) => {
	User.findOne({ username })
		.then(async user => {
			// user does not exists or provided incorrect password
			if (!user || !(await user.verifyPassword(password)))
				return done(null, false)

			// everything seems fine
			return done(null, user)
		})
		.catch(err => done(err))
}))

const customExtractor = req => {
	let token = null;
	const header = req.headers.authorization || ''
	// Bearer: <stop_point at space><XXX - token itself >
	
	if (header[7] === ' ')
		token = header.slice(8)
	return token
}

// JWT-стратегия авторизации
passport.use(new JwtStrategy({
    jwtFromRequest: customExtractor,
    secretOrKey: secrets.jwt,
}, async (tokenData, done) => {
	const user = await User.findOne({ username: tokenData.username })
	if (!user)
		return done(null, false)
	else (user)
		return done(null, user)
}))


// Экспорт
module.exports = passport

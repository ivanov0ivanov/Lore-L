// Подключение модулей
const path = require('path'),
  router = require('express').Router(),
  User = require(path.join(__dirname, '..', '..', 'models', 'user')).User,
  createToken = require(path.join(__dirname, '..', '..', 'other', 'createToken')),
  passport = require(path.join(__dirname, '..', '..', 'libs', 'passport')),
  config = require(path.join(__dirname, '..', '..', 'config'))


// Блок переменных
const {github, google} = config.oauth


const genericOauthCB = async (accessToken, refreshToken, profile, done) => {
	let user = await User.findOne({ [`${profile.provider}.id`]: profile.id })
	if (!user)
		user = await User.oauth(profile, accessToken, refreshToken)
	// console.log(profile, user)
	return done(null, user)
}
const redirect = (req, res) => {
	if (!req.user)
		throw new Error('how?')
	res.redirect('/user?token=' + createToken({ username: req.user.username }))
}

const GitHubStrategy = require('passport-github2')
passport.use(new GitHubStrategy({
	clientID: github.client_id,
	clientSecret: github.client_secret,
	callbackURL: github.callback_url,
}, genericOauthCB))

router.get('/github', passport.authenticate('github', {
	scope: [ 'user:email' ], session: false
}), redirect)

router.get('/github-callback', passport.authenticate('github', {
	failureRedirect: '/login', session: false
}), redirect)

const Google20Strategy = require('passport-google-oauth20').Strategy
passport.use(new Google20Strategy({
	clientID: google.client_id,
	clientSecret: google.client_secret,
	callbackURL: google.callback_url,
}, genericOauthCB))
router.get('/google', passport.authenticate('google', {
	scope: [ 'profile' ], session: false
}), redirect)

router.get('/google-callback', passport.authenticate('google', {
	failureRedirect: '/login', session: false
}), redirect)


// Экспорт
module.exports = router

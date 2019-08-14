// Подключение модулей
const path = require('path'),
  passport = require(path.join(__dirname, '..', '..', 'libs', 'passport')),
  errors = require(path.join(__dirname, 'errors')),
  { laidoff } = require(path.join(__dirname, 'backoff')),
  createToken = require(path.join(__dirname, '..', '..', 'other', 'createToken'))


const signin = (req, res, next) => passport.authenticate('local', {
  session: false,
}, async (err, user) => {
  if (err)
    return res.status(401).json({
      // err,
      message: 'Error happened durning authorization'
    })
  if (!user)
    return res.status(401).json({
      err: 'wrongData',
      message: errors.authentication.wrongData
    })

  // обнуляем блокировки при успешном логине
  await laidoff(user)

  return res.status(200).json({
    message: 'success',
    user: {
      username: user.username,
      token: createToken({ username: user.username })
    }
  })
})(req, res, next)


// Экспорт
module.exports = signin

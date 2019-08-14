// Подключение модулей
const path = require('path'),
  multer = require('multer'),
  MD5 = require('crypto-js/md5'),
  _ = require('lodash'),
  Solution = require(path.join(__dirname, '..', '..', 'models', 'solution')).Solution,
  alerts = require(path.join(__dirname, 'alerts'))
  

// Блок переменных
const pathFiles = path.resolve(__dirname, `../../media`)


// upload many files
const uploader = multer({
  storage: multer.diskStorage({
    destination (req, file, callback) {
      callback(null, pathFiles)
    },
    filename (req, file, callback) {
      let name = MD5(Math.random() + file.originalname).toString()
      // get filetype from file
      let format = file.originalname.match(/.(\w+)$/)[1]
      callback(null, `${name}.${format}`)
    }
  }),
})


// Получение решения по ID
exports.get = async (req, res) => {
  try {
    // Блок переменных
    const solution = await Solution.findById(req.params.id)

    if(!solution) return res.status(404).json(alerts.notFound)

    // Отправка данных на клиент
    res.json({
      solution: solution
    })
  } catch(err) {
    res.status(400).json(alerts.getFailed)
  }
}

exports.post = async (req, res) => {
  // uploade all files
  (uploader.fields([
      {
        name: 'file',
        maxCount: 30
      }, {
        name: 'image',
        maxCount: 1
      }
  ]))(req, res, async (err) => {
    if (err) {
      res.status(403).json(alerts.uploadFailed)
    } else {

      let {body, files} = req
      let image = []
      let file = _.get(files, 'file', [])
      if (_.get(files, 'image.length', 0) > 0) {
        image = _.get(files, 'image[0].filename', [])
      }
      let result = await Solution.create({
        project: body.project_id,
        task: body.id,
        shortSolution: body.shortDecision,
        solution: body.decision,
        status: 'Новое',
        files: file.map(el => el.filename),
        visualization: image,
        user: body.userId
      })
      if (result) {
        res.json(alerts.sendingSuccess)
      } else {
        res.json(alerts.sendingFailed)
      }
    }
  })
}



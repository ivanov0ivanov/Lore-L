// Подключение модулей
const path = require('path'),
  multiparty = require('multiparty'),
  fs = require('fs'),
  Solution = require(path.join(__dirname, '..', '..', 'models', 'solution')).Solution,
  save = require(path.join(__dirname, 'save')),
  parse = require(path.join(__dirname, 'parse')),
  alerts = require(path.join(__dirname, 'alerts'))


// Получение решений
exports.get = async (req, res) => {
  try {
    // Блок переменных
    let query = {}


    // Если переданны параметры филтрации, то записываем их в объект запроса
    if(req.urlData.params['param'] && req.urlData.params['value']) query = {
        [req.urlData.params['param']]: req.urlData.params['value']
      }


    // Получение списка решений
    const solutions = await Solution.find(query)


    // Отправка данных на клиент
    res.json({
      solutions: solutions
    })
  } catch(err) {
    res.status(400).json(alerts.failedGetting) // Ошибка получения
  }
}

// Добавление решения
exports.post = (req, res) => {
  try {
    // Блок переменных
    const form = new multiparty.Form()
  
    // Парсинг данных формы
    form.parse(req, async function(err, fields, files) {
      if(err) throw err

      // Блок переменных
      let {project, section, task, shortSolution, solution, user} = fields,
        {attachment, visualization} = files,
        data = {},
        update = {
          $addToSet: {
          }
        }

      // Если не все поля заполнены, то возврат ошибки
      if(project === undefined || (shortSolution === undefined && solution === undefined) || user === undefined) return res.status(400).json(alerts.required)

      // Если неверный формат файла визуализации, то возврат ошибки
      if(visualization !== undefined && (visualization[0].headers['content-type'] !== 'image/gif' && visualization[0].headers['content-type'] !== 'image/jpeg')) return res.status(400).json(alerts.invalidVisualization)

      // Если слишком тяжелые файлы
      if(attachment && await parse.size(attachment) > 10) return res.status(400).json(alerts.heavyFiles)

      

      // "Распаковка" значений
      if(project) data.project = project[0]
      if(section) data.section = section[0]
      if(task) data.task = task[0]
      if(shortSolution) data.shortSolution = shortSolution[0]
      if(solution) data.solution = solution[0]
      if(user) data.user = user[0]


      // Добавление решения
      let result = await Solution.add(data)


      // Если имеются вложения
      if(attachment && attachment.length) {
        // Создание папки для вложений
        fs.mkdirSync(path.join(__dirname, '..', '..', '..', 'public', 'img', 'attachments', String(result._id)))

        // Сохранение вложений
        update['$addToSet']['files'] = await save(path.join(__dirname, '..', '..', '..', 'public', 'img', 'attachments', String(result._id)), attachment, `/img/attachments/${String(result._id)}/`)
      }

      // Если имеется визуализация
      if(visualization && visualization.length) {
        // Создание папки для вложений
        fs.mkdirSync(path.join(__dirname, '..', '..', '..', 'public', 'img', 'visualization', String(result._id)))

        // Сохранение визуализаций
        update['$addToSet']['visualization'] = await save(path.join(__dirname, '..', '..', '..', 'public', 'img', 'visualization', String(result._id)), visualization, `/img/visualization/${String(result._id)}/`)
      }

      
      // Если появились данные для обновления, то обновляем
      if(Object.keys(update['$addToSet']).length) {
        await Solution.findByIdAndUpdate(result._id, update)
      }


      // Ответ клиенту
      res.json(alerts.addSuccess)
    })
  } catch(err) {
    res.status(500).json(alerts.addFailed)
  }
}





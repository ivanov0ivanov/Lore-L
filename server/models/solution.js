// Блок переменных
const path = require('path'),
	mongoose = require(path.join(__dirname, '..', 'libs', 'mongoose'))


// Блок переменных
const Schema = mongoose.Schema


// Создание схемы
const schema = new Schema({
  project: { // Проект
    type: Number,
    required: true
  },
  section: { // Раздел
    type: Number
  },
  task: { // Задача
    type: Number
  },
  shortSolution: {	// Краткое описание решения
    type: String
  },
  solution: {	// Решение
    type: String
  },
  user: { // Пользователь
    type: mongoose.Schema.Types.ObjectId, // Ссылка на документ из модели "User"
    ref: 'User',
    required: true
  },
  status: { // Статус
    type: String,
    required: true,
    default: 'Новое'
  },
  files: [{ // Файлы
    type: String
  }],
  visualization: [{ // Файлы визуализации
    type: String
  }],
  checks: [{ // Итоги проверок
    inspector: { // Кто проверил
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    date: { // Когда
      type: Date,
      required: true
    },
    result: { // Результат проверки
      type: String,
      required: true
    }
  }],
  votes: [{ // Итоги голосований
    participants: { // Кол-во участников
      type: Number
    },
    participation: { // Кол-во голосов
      type: Number
    },
    date: { // Когда
      type: Date,
      required: true
    },
    result: { // Итог голосования
      type: String,
      required: true
    }
  }],
  created: { // Дата создания
		type: Date,
		required: true,
		default: Date.now
	},
})



// Добавление решения
schema.statics.add = async function({project, section, task, shortSolution, solution, user}) {
	// Получение модели
	let Solution = this
	
	// Формирование нового решения
	var solution = new Solution({
    project: project,
    section: section,
    task: task,
		shortSolution: shortSolution,
    solution: solution,
    user: mongoose.Types.ObjectId(user)
	})

	// Сохранение
	return await solution.save()
}


// Экспорт
exports.Solution = mongoose.model('Solution', schema)

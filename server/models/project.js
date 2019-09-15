// Блок переменных
const path = require('path'),
	mongoose = require(path.join(__dirname, '..', 'libs', 'mongoose'))


// Блок переменных
const Schema = mongoose.Schema


// Создание схемы
const projectSchema = new Schema({
  _id: new mongoose.Schema.Types.ObjectId,
  projectNumber: { // внутренний номер проекта (для OpenProject)
    type: Number
    // required: true,
    // default: 4
  },
  projectName: String,
  projectDescription: String,
  account: String,
  section: [{ // массив разделов
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    name: String,
    share: Number,   // доля раздела в проекте
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
  }],
  task: [{ // Задача
    type: Number,
    task_id: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
  founder: [{ // Основатели
    type: mongoose.Schema.Types.ObjectId, // Ссылка на документ из модели "User"
    ref: 'User',
    required: true
  }],
  created: { // Дата создания
	type: Date,
	required: true,
	default: Date.now
	},
})

const sectionSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    share: Number,
    account: String,
    particitants: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

const taskSchema = Schema({
    _id: Schema.Types.ObjectId,
    number: Number, // номер в OpenProject
    account: String,
    cost: Number,
    dueDate: Date,
    created: Date,
    solutions:[{
        type: Schema.Types.ObjectId,
        ref: 'Solution'
    }]
})

exports.Section = mongoose.model('Section', sectionSchema)
exports.Task = mongoose.model('Task', taskSchema)

// Добавление проекта
// projectSchema.statics.add = async function({projectNumber, projectName, account, founder}) {
	// Получение модели
	// let Project = this

	// Формирование нового проекта
	// const project = new Project({
    // projectMunber: projectNumber,
    // projectName: projectName,
    // account: account,
    // founder: mongoose.Types.ObjectId(founder)
	// })

	// Сохранение
// 	return await project.save()
// }


// Экспорт
exports.Project = mongoose.model('Project', projectSchema)

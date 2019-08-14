// Уведомления
module.exports = {
  getFailed: { // Ошибка получения
    group: 'solutions',
    type: 'getFailed'
  },
  required: { // Обязательные поля
    group: 'solutions',
    type: 'required'
  },
  invalidVisualization: { // Недопустимый формат визуализации
    group: 'solutions',
    type: 'invalidVisualization'
  },
  heavyFiles: { // Тяжелые файлы
    group: 'solutions',
    type: 'heavyFiles'
  },
  addFailed: { // Ошибка добавления
    group: 'solutions',
    type: 'addFailed'
  },
  addSuccess: { // Успешное долавление
    group: 'solutions',
    type: 'addSuccess'
  }
}

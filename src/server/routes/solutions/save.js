// Подключение модулей
const path = require('path'),
  fs = require('fs')


// Сохранение файла
async function save(folder, file) {
  try {
    // Блок переменных
    let filename = path.join(folder, file.originalFilename),
      data = fs.readFileSync(file.path)

    // Сохранение файла по указанному адресу
    fs.appendFileSync(filename, data)

    return file.originalFilename
  } catch(err) {
    throw err
  }
}

// Сохранение массива файлов
async function saver(folder, files, prefix) {
  try {
    // Блок переменных
    let result = []

    // Перебор всех файлов
    for([f_index, file] of files.entries()) {
      // Сохранение файла и запись его URL
      result.push(prefix + await save(folder, file))

      // Если перебор окончен, то возврат результата
      if(f_index >= (files.length - 1)) return result
    }
  } catch(err) {
    throw err
  }
}


// Экспорт
module.exports = saver

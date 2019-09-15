// Счетчик общего размера всех файлов
async function size(files) {
  try {
    // Блок переменных
    let result = 0

    // Перебор всех файлов
    for([f_index, file] of files.entries()) {
      result += Number(file.size)

      // Если перебор окончен, то возврат результата
      if(f_index >= (files.length - 1)) return Number((result / 1000000).toFixed(2))
    }
  } catch(err) {
    throw err
  }
}


// Экспорт
exports.size = size

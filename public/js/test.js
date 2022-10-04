// let test3 = 'asdasda',
//   test2 = 'pdf',
//   test4 = 'docx'
//
// const obj1 = {
//   topic: 'Test topic',
// }
//
// // Добавление строки к свойству объекта, если строка не пустая, а также проаерка наличия свойства в объекте.
// function ifNotEmpty(obj, str1, str2) {
//   if (str1 && str2) {
//     return (obj.fileName ? obj.fileName += `, ${str1}` : obj.fileName = `${str1}`), (obj.fileExt ?  obj.fileExt += `, ${str2}` : obj.fileExt = `${str2}`)
//   }
// }
//
// ifNotEmpty(obj1, test3, test4)
// ifNotEmpty(obj1, test3, test2)
// console.log(obj1)

// const test = {
//   id: 20,
//   topic: "Test 2",
//   file_name_old: "0974170_ph172788_s5.jpg, Болотников Михаил Сергеевич.docx, Тарифы_брокеров_СПб_биржа (pdf.io).pdf, a30d1675484032008e5e7a082d55b6dbe592bd3eb07d1400ee1e9f65633bb13c.jpeg",
//   file_new_name: "1627217091105.jpg, 1627217091109.docx, 1627217091109.pdf, 1627217091110.jpg",
// }

// const test1 = {
//   id: 19,
//   topic: "Test 1",
//   file_name_old: "0974170_ph172788_s5.jpg",
//   file_new_name: "1627216822317.jpg",
// }

// test.file_name_old = stringInArr(test.file_name_old, ', ')
// test.file_new_name = test.file_new_name.split(', ')
// let str = "1627217091105.jpg, 1627217091109.docx, 1627217091109.pdf, 1627217091110.jpg"
// // console.log(str.split(', ').length)

// function stringInArr(str, sep) {
//   return str.split(sep)
// }

// let str1 = "1627215.jspg1627217091105.jpg, 1627217091109.docx, 1627217091109.pdf, 1627217091110.jpg"

// // console.log(str1.slice(1, 40) + '...')

// let obj1 = {
//   name: 'test',
//   age: 11,
//   test: '',
//   avatar: 'img.jpg'
// }

// for (const obj1Key in obj1) {
//   if (obj1[obj1Key]) {
//     console.log(`Ключ ${obj1Key}, значение ${obj1[obj1Key]}`)
//   } else {
//     delete obj1[obj1Key]
//     console.log(`У ключа ${obj1Key}, значение пусто`)
//   }
// }

// console.log(obj1.hasOwnProperty('name1'))
// let obj2 = {}
// let emptyObj = Object.keys(obj2).length === 0
//
// if (!Object.keys(obj2).length === 0) {
//   console.log(1)
//   console.log(Object.keys(obj2).length === 0)
// } else {
//   console.log(2)
//   console.log(Object.keys(obj2).length === 0)
// }

const btnDelete = document.querySelectorAll('.delete')

btnDelete.forEach(btn => {
  btn.addEventListener('click', e => {
    const result = confirm('Вы точно хотите удалить?')

    if (!result) e.preventDefault()
  })
})

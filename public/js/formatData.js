function testFormatDate(selectorName) {
  let selectorDate = document.querySelectorAll(selectorName)
  const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`)

  selectorDate.forEach((item) => {
    let newTime = new Date(item.innerHTML)
    item.innerHTML = `${normalize(newTime.getDate())}.${normalize(newTime.getMonth() + 1)}.${normalize(newTime.getFullYear())} ${normalize(newTime.getHours())}:${normalize(newTime.getMinutes())}`
  })
}

testFormatDate('#time')

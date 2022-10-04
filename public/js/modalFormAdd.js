const testBtnModal = document.querySelector('#testBtn')

testBtnModal.addEventListener('click', e => {
  e.preventDefault()

  const span = document.querySelector('#error-message')
  const form = document.querySelector('.form-add')

  document.getElementsByName('name').forEach(input => {
    let inputTrim = input.value.trim()

    if (inputTrim === '') {
      return (span.innerHTML = 'Поле является обязательным!')
    } else if (inputTrim.length < 2) {
      return (span.innerHTML = 'Название должно быть не менее 2-х символов!')
    }

    span.innerHTML = ''
    form.submit()
  })
})

const btnAdd = document.querySelector('#btnAddInputFile')
let count = 0

btnAdd.addEventListener('click', () => {
  const formDoc = document.querySelector('.group-input-file-add')
  const elem = document.createElement('div')

  count++

  if (count <= 3) {
    elem.innerHTML = `
      <div class="mb-2 row">
        <div class="col-sm-4">
          <div class="input-group">
            <input type="file" class="form-control" name="file_${count}" id="file_${count}" aria-describedby="file_${count}" aria-label="Upload">
          </div>
        </div>
      </div>
    `
  } else {
    btnAdd.disabled = true
  }

  formDoc.append(elem)
})

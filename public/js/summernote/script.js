$('#description_question').summernote({
  lang: 'ru-RU',
  height: 400,
  minHeight: 150,
  maxHeight: 600,
  focus: true,
  disableDragAndDrop: true,
  placeholder: 'Введите текст',
  toolbar: [
    ['other', ['undo', 'redo']],
    ['style', ['bold', 'italic', 'underline', 'clear']],
    ['font', ['strikethrough', 'superscript', 'subscript']],
    ['fontsize', ['fontname', 'fontsize']],
    ['hr', ['hr', 'table']],
    ['color', ['color']],
    ['para', ['ul', 'ol', 'paragraph']],
    ['height', ['height']],
    ['insert', ['link', 'picture', 'video', 'file']],
    ['view', ['codeview', 'help']],
  ],
  callbacks: {
    onFileUpload: function (file) {
      myOwnCallBack(file[0])
    },
  },
})

function myOwnCallBack(file) {
  let url = $('#description_question').data('url')
  console.log(url)
  let data = new FormData()
  data.append("file", file)
  console.log(data)
  $.ajax({
    data: data,
    type: 'POST',
    url: url,
    cache: false,
    contentType: false,
    processData: false,
    xhr: function () {
      //Handle progress upload
      let myXhr = $.ajaxSettings.xhr()
      if (myXhr.upload) myXhr.upload.addEventListener('progress', progressHandlingFunction, false)
      return myXhr
    },
    success: function (response) {
      if (response) {
        let listMimeImg = ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg']
        let listMimeAudio = ['audio/mpeg', 'audio/ogg']
        let listMimeVideo = ['video/mpeg', 'video/mp4', 'video/webm']

        if (listMimeImg.indexOf(file.type) > -1) {
          //Picture
          // let image = $('<img>').attr('src', '/uploads/article/img/' + response.fileName)
          $('#description_question').summernote('insertImage', `/uploads/article/img/${response.fileName}`, function ($image) {
            $image.css('width', $image.width() / 3)
            $image.attr('data-filename', 'retriever')
          })
        } else if (listMimeAudio.indexOf(file.type) > -1) {
          //Audio
          let audioFile = $('<audio>').attr('src', `/uploads/article/other/${response.fileName}`).attr('controls', 'controls').attr('preload', 'metadata')
          console.log(audioFile[0])
          $('#description_question').summernote('editor.insertNode', audioFile[0])
        } else if (listMimeVideo.indexOf(file.type) > -1) {
          //Video
          let videoFile = $('<video>').attr('src', `/uploads/article/file/${response.fileName}`).attr('controls', 'controls').attr('preload', 'metadata').append(file.name)
          console.log(videoFile[0])
          $('#description_question').summernote('editor.insertNode', videoFile[0])
        } else {
          //Other file type
          let otherFile = $('<a>').attr('href', `/uploads/article/file/${response.fileName}`).attr('title', file.name).append(file.name)

          $('#description_question').summernote('insertNode', otherFile[0])
        }
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.status)
      let textError
      if (jqXHR.status === 422) {
        textError = `Код ошибки: ${jqXHR.status}. Необрабатываемый файл. Проверьте расширение файла. Допустимые расширения (\'zip\', \'jpg\', \'png\', \'jpeg\', \'bmp\', \'pdf\', \'docx\', \'doc\', \'docm\', \'docx\', \'xlsx\', \'xls\', \'xlsm\', \'xlsb\', \'xml\', \'mp4\', \'mp3\', \'mpeg\').`
      } else if (jqXHR.status === 413) {
        textError = `Код ошибки: ${jqXHR.status}. Размер файла слишком большой. Допустимый размер файла 25мб.`
      }

      const message = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          ${textError}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `
      $('#container-1').prepend(message)
    },
  })
}

function progressHandlingFunction(e) {
  if (e.lengthComputable) {
    //Log current progress
    console.log((e.loaded / e.total) * 100 + '%')

    //Reset progress on complete
    if (e.loaded === e.total) {
      console.log('Upload finished.')
    }
  }
}

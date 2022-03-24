import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RequestFileValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    file: schema.file.optional({
      size: '25mb',
      extnames: ['zip', 'jpg', 'png', 'jpeg', 'bmp', 'pdf', 'docx', 'doc', 'docm', 'docx', 'xlsx', 'xls', 'xlsm', 'xlsb', 'xml', 'mp4', 'mp3', 'mpeg']
    })
  })

  public messages = {
    'file.size': 'Загружаемый файл больше 15мб.',
    'file.file.extname': 'Загружаемый файл должен иметь одно из следующих расширений: {{ options.extnames }}'
  }
}

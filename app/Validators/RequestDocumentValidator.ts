import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RequestDocumentValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    topic: schema.string({
        trim: true,
        escape: true,
      },
      [rules.minLength(2), rules.maxLength(240)]
    ),
    file: schema.file.optional({
      size: '15mb',
      extnames: ['jpg', 'png', 'jpeg', 'bmp', 'pdf', 'docx', 'doc', 'docm', 'docx', 'xlsx', 'xls', 'xlsm', 'xlsb', 'xml']
    }),
    file_1: schema.file.optional({
      size: '15mb',
      extnames: ['jpg', 'png', 'jpeg', 'bmp', 'pdf', 'docx', 'doc', 'docm', 'docx', 'xlsx', 'xls', 'xlsm', 'xlsb', 'xml']
    }),
    file_2: schema.file.optional({
      size: '15mb',
      extnames: ['jpg', 'png', 'jpeg', 'bmp', 'pdf', 'docx', 'doc', 'docm', 'docx', 'xlsx', 'xls', 'xlsm', 'xlsb', 'xml']
    }),
    file_3: schema.file.optional({
      size: '15mb',
      extnames: ['jpg', 'png', 'jpeg', 'bmp', 'pdf', 'docx', 'doc', 'docm', 'docx', 'xlsx', 'xls', 'xlsm', 'xlsb', 'xml']
    }),
    file_4: schema.file.optional({
      size: '15mb',
      extnames: ['jpg', 'png', 'jpeg', 'bmp', 'pdf', 'docx', 'doc', 'docm', 'docx', 'xlsx', 'xls', 'xlsm', 'xlsb', 'xml']
    }),
  })

  public messages = {
    'topic.required': 'Поле "Тема" является обязательным.',
    'topic.minLength': 'Минимальная длинна поля 2 символа.',
    'topic.maxLength': 'Максимальная длинна поля 240 символов.',
    'file.size': 'Загружаемый файл больше 15мб.',
    'file.file.extname': 'Загружаемый файл должен иметь одно из следующих расширений: {{ options.extnames }}',
    'file_1.size': 'Загружаемый файл больше 15мб.',
    'file_1.file.extname': 'Загружаемый файл должен иметь одно из следующих расширений: {{ options.extnames }}',
    'file_2.size': 'Загружаемый файл больше 15мб.',
    'file_2.file.extname': 'Загружаемый файл должен иметь одно из следующих расширений: {{ options.extnames }}',
    'file_3.size': 'Загружаемый файл больше 15мб.',
    'file_3.file.extname': 'Загружаемый файл должен иметь одно из следующих расширений: {{ options.extnames }}',
    'file_4.size': 'Загружаемый файл больше 15мб.',
    'file_4.file.extname': 'Загружаемый файл должен иметь одно из следующих расширений: {{ options.extnames }}',
  }
}

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
  })

  public messages = {
    'topic.required': 'Поле "Тема" является обязательным.',
    'topic.minLength': 'Минимальная длинна поля 2 символа.',
    'topic.maxLength': 'Максимальная длинна поля 240 символов.'
  }
}

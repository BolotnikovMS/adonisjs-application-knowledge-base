import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RequestProgramListValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({
        trim: true,
        escape: true,
      },
      [
        rules.minLength(2),
        rules.maxLength(200),
      ]
    ),
    description: schema.string.optional({
        trim: true,
        escape: true,
      },
      [
        rules.maxLength(500),
      ]
    ),
    site: schema.string.optional({
        trim: true,
      },
      [rules.maxLength(200), rules.url()]
    )
  })

  public messages = {
    'name.required': 'Поле "Название" является обязательным.',
    'name.minLength': 'Минимальная длинна поля 2 символа.',
    'name.maxLength': 'Максимальная длинна поля 200 символов.',
    'description.maxLength': 'Максимальная длинна поля 10 символов.',
    'site.maxLength': 'Максимальная длинна поля 200 символов.'
  }
}

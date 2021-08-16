import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RequestSearchValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    search: schema.string({trim: true, escape: true}, [
      rules.minLength(3)
    ])
  })

  public messages = {
    'search.required': 'Поле является обязательным.',
    'search.minLength': 'Минимальная длинна поля 3 символа.',
  }
}
import { rules, schema } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RequestArticleValidator {
  constructor(protected ctx: HttpContextContract) {
  }

	/*
	 * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
	 *
	 * For example:
	 * 1. The username must be of data type string. But then also, it should
	 *    not contain special characters or numbers.
	 *    ```
	 *     schema.string({}, [ rules.alpha() ])
	 *    ```
	 *
	 * 2. The email must be of data type string, formatted as a valid
	 *    email. But also, not used by any other user.
	 *    ```
	 *     schema.string({}, [
	 *       rules.email(),
	 *       rules.unique({ table: 'users', column: 'email' }),
	 *     ])
	 *    ```
	 */
  public schema = schema.create({
    description_question: schema.string({
        trim: true,
        escape: true,
      },
      [rules.minLength(2), rules.maxLength(700)]
    )
  })

	/**
	 * Custom messages for validation failures. You can make use of dot notation `(.)`
	 * for targeting nested fields and array expressions `(*)` for targeting all
	 * children of an array. For example:
	 *
	 * {
	 *   'profile.username.required': 'Username is required',
	 *   'scores.*.number': 'Define scores as valid numbers'
	 * }
	 *
	 */
  public messages = {
    'topic.required': 'Поле "Тема" является обязательным.',
    'topic.minLength': 'Минимальная длинна поля 2 символа.',
    'topic.maxLength': 'Максимальная длинна поля 700 символов.',
  }
}

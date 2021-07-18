import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RequestProgramListValidator {
  constructor(protected ctx: HttpContextContract) {}

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
    name: schema.string({
        trim: true,
        escape: true,
      },
      [rules.minLength(2), rules.maxLength(200)]
    ),
    description: schema.string.optional({
        trim: true,
        escape: true,
      },
      [rules.maxLength(500)]
    ),
    site: schema.string.optional({
        trim: true,
      },
      [rules.maxLength(200), rules.url()]
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
    'name.required': 'Поле "Название" является обязательным.',
    'name.minLength': 'Минимальная длинна поля 2 символа.',
    'name.maxLength': 'Максимальная длинна поля 200 символов.',
    'description.maxLength': 'Максимальная длинна поля 10 символов.',
    'site.maxLength': 'Максимальная длинна поля 200 символов.'
  }
}

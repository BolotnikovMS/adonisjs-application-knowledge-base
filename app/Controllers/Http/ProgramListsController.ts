import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import ProgramList from 'App/Models/ProgramList'

export default class ProgramListsController {
  public async index({ view, request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 15
    const programs = await ProgramList.query().preload('article').paginate(page, limit)

    programs.baseUrl('/list-program/')

    return view.render('pages/programs/index', {
      title: 'Список программ',
      programs
    })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('pages/programs/create', { title: 'Добавить программу' })
  }

  public async store({ request, response, session }: HttpContextContract) {
    const validSchema = schema.create({
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

    const messages = {
      'name.required': 'Поле "Название" является обязательным.',
      'name.minLength': 'Минимальная длинна поля 2 символа.',
      'name.maxLength': 'Максимальная длинна поля 200 символов.',
      'description.maxLength': 'Максимальная длинна поля 10 символов.',
      'site.maxLength': 'Максимальная длинна поля 200 символов.'
    }

    const validatedData = await request.validate({
      schema: validSchema,
      messages
    })

    await ProgramList.create(validatedData)

    session.flash('successmessage', `Программа "${validatedData.name}" успешно добавлена в список.`)
    response.redirect('/list-program/')
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({ params, response }: HttpContextContract) {
    const program = await ProgramList.findOrFail(params.id)

    await program.delete()

    return response.send(`Program: id:${program.id} topic:${program.name} has been deleted!`)
  }
}

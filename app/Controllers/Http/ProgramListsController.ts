import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ProgramList from 'App/Models/ProgramList'
import RequestProgramListValidator from 'App/Validators/RequestProgramListValidator'

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
    const validatedData = await request.validate(RequestProgramListValidator)

    await ProgramList.create(validatedData)

    session.flash('successmessage', `Программа "${validatedData.name}" успешно добавлена в список.`)
    response.redirect('/list-program/')
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({ params, response, session }: HttpContextContract) {
    const program = await ProgramList.findOrFail(params.id)

    await program.delete()

    session.flash('successmessage', `Программа ${program.name} была удалена!`)
    response.redirect('/list-program/')
  }
}

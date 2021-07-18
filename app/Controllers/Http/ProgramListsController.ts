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

  public async edit({ view, params }: HttpContextContract) {
    const program = await ProgramList.findOrFail(params.id)

    return view.render('pages/programs/edit', {
      title: 'Редактирование',
      program
    })
  }

  public async update({ params, request, response, session }: HttpContextContract) {
    const validatedData = await request.validate(RequestProgramListValidator)
    const program = await ProgramList.findOrFail(params.id)

    console.log(validatedData)
    if (program) {
      program.name = validatedData.name
      // @ts-ignore
      if (validatedData.description == null) {
        program.description = null
      } else {
        program.description = validatedData.description
      }
      // @ts-ignore
      program.site = validatedData.site
      await program.save()
    } else {
      // перенаправка на страницу ошибки
    }

    session.flash('successmessage', `Данные об программе "${program.name}" успешно обновлены.`)
    response.redirect('/list-program/')
  }

  public async destroy({ params, response, session }: HttpContextContract) {
    const program = await ProgramList.findOrFail(params.id)

    await program.delete()

    session.flash('successmessage', `Программа ${program.name} была удалена!`)
    response.redirect('/list-program/')
  }
}

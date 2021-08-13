import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ProgramList from 'App/Models/ProgramList'
import Question from 'App/Models/Question'

import RequestProgramListValidator from 'App/Validators/RequestProgramListValidator'
import { afterSave } from "@ioc:Adonis/Lucid/Orm";

export default class ProgramListsController {
  public async index({ view, request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 15
    const programs = await ProgramList.query().preload('questions').paginate(page, limit)

    programs.baseUrl('/list-program/')

    return view.render('pages/programs/index', {
      title: 'Список программ',
      programs
    })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('pages/programs/create', { title: 'Добавить программу' })
  }

  public async store({ request, response, session, view }: HttpContextContract) {
    const validatedData = await request.validate(RequestProgramListValidator)

    if (validatedData) {
      let program = {}

      for (const validatedDataKey in validatedData) {
        if (validatedData[validatedDataKey]) {
          program[validatedDataKey] = validatedData[validatedDataKey]
        }
      }

      if (Object.keys(program).length === 0) {
        session.flash('dangermessage', `Введенно пустое значение в поле название.`)
        response.redirect('/list-program/')
      } else {
        if (program.hasOwnProperty('name')) {
          await ProgramList.create(program)

          session.flash('successmessage', `Программа "${validatedData.name}" успешно добавлена в список.`)
          response.redirect('/list-program/')
        } else {
          session.flash('dangermessage', `Введенно пустое значение в поле название.`)
          response.redirect('/list-program/')
        }
      }
    } else {
      response.status(404)

      return view.render('pages/error/404', {
        title: 'Error 404'
      })
    }
  }

  public async show({ view, params, request }: HttpContextContract) {
    const programId = params.id
    const page = request.input('page', 1)
    const limit = 10
    const questions = await Question.query()
      .where('program_id', '=', programId)
      .preload('articles')
      .paginate(page, limit)

    questions.baseUrl(`/list-program/show/${programId}`)

    return view.render('pages/programs/show', {
      title: `Программа "1"`,
      questions,
      programId
    })
  }

  public async edit({ view, params }: HttpContextContract) {
    const program = await ProgramList.findOrFail(params.id)

    return view.render('pages/programs/edit', {
      title: 'Редактирование',
      program
    })
  }

  public async update({ params, request, response, session, view }: HttpContextContract) {
    const validatedData = await request.validate(RequestProgramListValidator)
    const program = await ProgramList.findOrFail(params.id)

    if (program && validatedData) {
      for (const validatedDataKey in validatedData) {
        if (!validatedData[validatedDataKey]) {
          delete validatedData[validatedDataKey]
        }
      }

      if (Object.keys(validatedData).length === 0) {
        session.flash('dangermessage', `Введенно пустое значение в поле название.`)
        response.redirect('/list-program/')
      } else {
        if (validatedData.hasOwnProperty('name')) {
          program.name = validatedData.name
          // @ts-ignore
          program.description = validatedData.description
          // @ts-ignore
          program.site = validatedData.site

          await program.save()
          session.flash('successmessage', `Данные об программе "${validatedData.name}" успешно обновлены.`)
          response.redirect('/list-program/')
        } else {
          session.flash('dangermessage', `Введенно пустое значение в поле название.`)
          response.redirect('/list-program/')
        }
      }
    } else {
      response.status(404)

      return view.render('pages/error/404', {
        title: 'Error 404'
      })
    }
  }

  public async destroy({ params, response, session }: HttpContextContract) {
    const program = await ProgramList.findOrFail(params.id)

    await program.delete()

    session.flash('successmessage', `Программа ${program.name} была удалена!`)
    response.redirect('/list-program/')
  }
}

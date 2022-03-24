import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RequestProgramListValidator from 'App/Validators/RequestProgramListValidator'

import WorkingDirection from 'App/Models/WorkingDirection'
import Category from 'App/Models/Category'

export default class WorkingDirectionsController {
  public async index ({view}: HttpContextContract) {
    const workings = await WorkingDirection.all()

    return view.render('pages/workingdir/index', {
      title: 'Направления',
      workings
    })
  }

  public async create ({view}: HttpContextContract) {
    return view.render('pages/workingdir/create', { title: 'Добавить направление' })
  }

  public async store ({request, response, session, view }: HttpContextContract) {
    const validatedData = await request.validate(RequestProgramListValidator)

    if (validatedData) {
      let working = {}

      for (const validatedDataKey in validatedData) {
        if (validatedData[validatedDataKey]) {
          working[validatedDataKey] = validatedData[validatedDataKey]
        }
      }

      if (Object.keys(working).length === 0) {
        session.flash('dangermessage', `Введенно пустое значение в поле название.`)
        response.redirect('/list-program/new')
      } else {
        if (working.hasOwnProperty('name')) {
          await WorkingDirection.create(working)

          session.flash('successmessage', `Направление "${validatedData.name}" успешно добавлена в список.`)
          response.redirect('/working-directions/')
        } else {
          session.flash('dangermessage', `Введенно пустое значение в поле название.`)
          response.redirect('/working-directions/new')
        }
      }
    } else {
      response.status(404)

      return view.render('pages/error/404', {
        title: 'Error 404'
      })
    }
  }

  public async show ({view, params}: HttpContextContract) {
    const workingId = params.id
    const working = await WorkingDirection.query().where('id', '=', workingId).preload('categories')
    const categories = await Category.query().where('working_direction_id', '=', workingId).preload('questions')

    // return categories

    // return working
    return view.render('pages/workingdir/show', {
      title: `Направление ${working[0].name}. Список тем.`,
      categories: working[0].categories,
      workingId: working[0].id
    })
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RequestProgramListValidator from 'App/Validators/RequestProgramListValidator'

import Category from 'App/Models/Category'

export default class CategoriesController {
  public async index ({}: HttpContextContract) {
  }

  public async create ({view, request}: HttpContextContract) {
    return view.render('pages/categories/create', {title: 'Добавить категорию', workingDirId: request.params().workingDirId})
  }

  public async store ({request, response, session, view}: HttpContextContract) {
    const validatedData = await request.validate(RequestProgramListValidator)

    if (validatedData) {
      let category = {
        working_direction_id: request.params().workingDirId
      }

      for (const validatedDataKey in validatedData) {
        if (validatedData[validatedDataKey]) {
          category[validatedDataKey] = validatedData[validatedDataKey]
        }
      }

      if (Object.keys(category).length === 0) {
        session.flash('dangermessage', `Введенно пустое значение в поле название.`)
        response.redirect('/list-program/new')
      } else {
        if (category.hasOwnProperty('name')) {
          await Category.create(category)

          session.flash('successmessage', `Программа "${validatedData.name}" успешно добавлена в список.`)
          response.redirect('back')
        } else {
          session.flash('dangermessage', `Введенно пустое значение в поле название.`)
          response.redirect('/list-program/new')
        }
      }
    } else {
      response.status(404)

      return view.render('pages/error/404', {
        title: 'Error 404'
      })
    }
  }

  public async show ({request, view}: HttpContextContract) {
    const categoryID = request.params()
    const category = await Category.query().where('id', '=', categoryID.id).preload('questions')

    return view.render('pages/questions/index', {title: 'Список вопросов', category: category})
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}

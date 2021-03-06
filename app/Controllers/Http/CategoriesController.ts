import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import WorkingDirectionValidator from 'App/Validators/WorkingDirectionValidator'

import Category from 'App/Models/Category'
import Question from 'App/Models/Question'

export default class CategoriesController {
  public async index ({}: HttpContextContract) {
  }

  public async create ({view, params}: HttpContextContract) {
    return view.render('pages/workingdir/form', {
      title: 'Добавить категорию',
      settings: {
        route: 'category.store',
        operationTypeBtn: 'Добавить',
        paramsId: {
          workingDirId: params.workingDirId
        }
      },
      placeholder: 'Введите название категории',
      routeBack: 'working_directions.show'
    })
  }

  public async store ({request, response, params, session}: HttpContextContract) {
    const validatedData = await request.validate(WorkingDirectionValidator)

    if (validatedData) {
      let category = {
        working_direction_id: params.workingDirId,
        ...validatedData
      }

      await Category.create(category)

      session.flash('successmessage', `Направление "${category.name}" успешно добавлено в список.`)
      response.redirect().toRoute('WorkingDirectionsController.show', {id: params.workingDirId})
    }
  }

  public async show ({request, response, params, view}: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 15
    const category = await Category.find(params.id)
    const questions = await Question.query()
      .where('category_id ', '=', params.id)
      .paginate(page, limit)

    questions.baseUrl(`/categories/${params.id}/questions/`)

    if (category) {
      return view.render('pages/categories/show', {
        title: `Список вопросов по теме: "${category.name}"`,
        questions,
        category
      })
    } else {
      response.status(404)

      return view.render('pages/error/404', {title: 'Error 404'})
    }
  }

  public async edit ({view, params}: HttpContextContract) {
    const category = await Category.find(params.id)

    // return category
    if (category) {
      return view.render('pages/workingdir/form', {
        title: 'Редактирование',
        settings: {
          route: 'category.update',
          operationTypeBtn: 'Сохранить',
          paramsId: {
            id: params.id,
            workingDirId: category?.working_direction_id
          }
        },
        placeholder: 'Введите название категории',
        content: category,
        routeBack: 'working_directions.show'
      })
    }
  }

  public async update ({request, response, params, session}: HttpContextContract) {
    const category = await Category.find(params.id)

    if (category) {
      const validatedData = await request.validate(WorkingDirectionValidator)

      category.name = validatedData.name

      await category.save()
      session.flash('successmessage', `Данные "${category.name}" успешно обновлены.`)
      response.redirect().toRoute('WorkingDirectionsController.show', {id: category.working_direction_id})
    }
  }

  public async destroy ({params, response, session}: HttpContextContract) {
    const category = await Category.find(params.id)

    if (category) {
      await category.delete()

      session.flash('successmessage', `Тема ${category.name} была удалена!`)
      response.redirect().toRoute('WorkingDirectionsController.show', {id: category.working_direction_id})
    } else {
      console.log('Error')
    }
  }
}

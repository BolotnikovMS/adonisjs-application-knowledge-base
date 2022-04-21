import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import WorkingDirectionValidator from 'App/Validators/WorkingDirectionValidator'

import WorkingDirection from 'App/Models/WorkingDirection'
import Category from 'App/Models/Category'

export default class WorkingDirectionsController {
  public async index ({request, view}: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 15
    const workings = await WorkingDirection.query().preload('categories').paginate(page, limit)

    workings.baseUrl('/working-directions/')

    return view.render('pages/workingdir/index', {
      title: 'Направления',
      workings
    })
  }

  public async create ({view}: HttpContextContract) {
    return view.render('pages/workingdir/form', {
      title: 'Добавить направление',
      settings: {
        route: 'working_directions.store',
        operationTypeBtn: 'Добавить'
      },
      placeholder: 'Введите название направления',
      routeBack: 'working_directions.index'
    })
  }

  public async store ({request, response, session }: HttpContextContract) {
    const validatedData = await request.validate(WorkingDirectionValidator)

    if (validatedData) {
      await WorkingDirection.create(validatedData)

      session.flash('successmessage', `Направление "${validatedData.name}" успешно добавлено в список.`)
      response.redirect().toRoute('WorkingDirectionsController.index')
    }
  }

  public async show ({request, response, view, params}: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 15
    const categories = await Category.query().where('working_direction_id ', '=', params.id).preload('questions').paginate(page, limit)
    const working = await WorkingDirection.find(params.id)

    categories.baseUrl(`/working-directions/${params.id}/categories/`)

    if (categories && working) {
      return view.render('pages/workingdir/show', {
        title: `Направление ${working.name}. Список тем.`,
        categories,
        workingId: working.id
      })
    } else {
      response.status(404)

      return view.render('pages/error/404', {title: 'Error 404'})
    }
  }

  public async edit ({view, params }: HttpContextContract) {
    const working = await WorkingDirection.find(params.id)

    if (working) {
      return view.render('pages/workingdir/form', {
        title: 'Редактирование',
        settings: {
          route: 'working_directions.update',
          paramsId: {
            id: params.id,
          },
          operationTypeBtn: 'Сохранить'
        },
        placeholder: 'Введите название направления',
        content: working,
        routeBack: 'working_directions.index'
      })
    } else {
      return view.render('pages/error/404', {title: 'Error 404'})
    }
  }

  public async update ({request, response, params, session}: HttpContextContract) {
    const working = await WorkingDirection.findOrFail(params.id)

    if (working) {
      const validatedData = await request.validate(WorkingDirectionValidator)

      working.name = validatedData.name

      await working.save()
      session.flash('successmessage', `Данные "${validatedData.name}" успешно обновлены.`)
      response.redirect().toRoute('WorkingDirectionsController.index')
    }
  }

  public async destroy ({params, response, session}: HttpContextContract) {
    const working = await WorkingDirection.find(params.id)

    if (working) {
      await working.delete()

      session.flash('successmessage', `Направление ${working.name} было удалено!`)
      response.redirect().toRoute('WorkingDirectionsController.index')
    } else {
      console.log('Error')
    }
  }
}

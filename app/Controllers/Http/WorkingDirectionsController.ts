import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import WorkingDirectionValidator from 'App/Validators/WorkingDirectionValidator'

import WorkingDirection from 'App/Models/WorkingDirection'

export default class WorkingDirectionsController {
  public async index ({view}: HttpContextContract) {
    const workings = await WorkingDirection.query().preload('categories')

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

  public async show ({response, view, params}: HttpContextContract) {
    const working = await WorkingDirection.find(params.id)

    if (working) {
      await working.load('categories', (questionsQuery) => {
        questionsQuery.preload('questions')
      })
      // return working

      return view.render('pages/workingdir/show', {
        title: `Направление ${working.name}. Список тем.`,
        categories: working.categories,
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

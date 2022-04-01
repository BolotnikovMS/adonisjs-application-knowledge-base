import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Question from 'App/Models/Question'

import RequestQuestionValidator from 'App/Validators/RequestQuestionValidator'
import RequestFileValidator from 'App/Validators/RequestFileValidator'
import Application from '@ioc:Adonis/Core/Application'
import {cuid} from '@ioc:Adonis/Core/Helpers'

export default class QuestionsController {
  public async index ({}: HttpContextContract) {
  }

  public async create ({view, params}: HttpContextContract) {
    return view.render('pages/questions/create', {title: 'Добавить новый вопрос', idCategory: params.id})
  }

  public async store ({request, response, params, session}: HttpContextContract) {
    const idCategory = params.id
    const validatedDataQuestion = await request.validate(RequestQuestionValidator)
    validatedDataQuestion.category_id = idCategory

    await Question.create(validatedDataQuestion)

    session.flash('successmessage',`Вопрос "${validatedDataQuestion.question}" успешно добавлен.`)
    response.redirect().toRoute('CategoriesController.show', {id: idCategory})
  }

  public async upload({ request }: HttpContextContract) {
    if (request.ajax()) {
      const validatedFile = await request.validate(RequestFileValidator)
      let path

      if (validatedFile.file?.type === 'application') {
        path = 'uploads/article/file'
      } else if (validatedFile.file?.type === 'image') {
        path = 'uploads/article/img'
      } else {
        path = 'uploads/article/other'
      }

      await validatedFile.file?.move(Application.publicPath(path), {
        name: `${cuid()}.${validatedFile.file.extname}`,
      })

      return { fileName: validatedFile.file?.fileName, clientName: validatedFile.file?.clientName }
    }
  }

  public async show ({request, view, params}: HttpContextContract) {
    const question = await Question.findOrFail(params.id)

    if (request.headers().referer) {
      question.url = request.headers().referer
    } else {
      question.url = '/'
    }

    return view.render('pages/questions/show', {
      title: `Просмотр статьи "${question.question.slice(0, 10)}"`,
      question,
    })
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Question from 'App/Models/Question'

export default class QuestionsController {
  public async index ({}: HttpContextContract) {
  }

  public async create ({view}: HttpContextContract) {
    return view.render('pages/questions/create', {title: 'Добавить новый вопрос'})
  }

  public async store ({}: HttpContextContract) {
  }

  public async show ({request, view, params}: HttpContextContract) {
    const question = await Question.findOrFail(params.id)

    if (request.headers().referer) {
      question.url = request.headers().referer
    } else {
      question.url = '/'
    }

    return view.render('pages/questions/show', {
      title: `Просмотр статьи "${question.topic_question.slice(0, 10)}"`,
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

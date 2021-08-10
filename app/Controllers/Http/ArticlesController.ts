import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import Application from '@ioc:Adonis/Core/Application'

import Question from 'App/Models/Question'
import Article from 'App/Models/Article'

import RequestQuestionValidator from 'App/Validators/RequestQuestionValidator'
import RequestFileValidator from 'App/Validators/RequestFileValidator'

export default class ArticlesController {
  public async create({ view, request }: HttpContextContract) {
    const progId = request.params()

    return view.render('pages/articles/create', { title: 'Добавить тему', progId })
  }

  public async store({ request, response, session }: HttpContextContract) {
    const idProgram = request.params()
    const validatedDataQuestion = await request.validate(RequestQuestionValidator)

    if (validatedDataQuestion) {
      // @ts-ignore
      validatedDataQuestion.program_id = idProgram.id

      await Question.create(validatedDataQuestion)

      const idQuestion = await Question.query().orderBy('id', 'desc').limit(1)
      const article = request.only(['description'])

      // @ts-ignore
      article.question_id = idQuestion[0].id
      article.program_id = idProgram.id

      await Article.create(article)

      session.flash(
        'successmessage',
        `Тема "${validatedDataQuestion.description_question}" успешно добавлена в список.`
      )
      response.redirect('back')
    } else {
      console.log('Error 404')
    }
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

  public async show({ view, request, response, params }: HttpContextContract) {
    const question = await Question.query().where('id', '=', params.id).preload('articles')

    if (question.length) {
      if (request.headers().referer) {
        question.url = request.headers().referer
      } else {
        question.url = '/list-program'
      }

      return view.render('pages/articles/show', {
        title: `Просмотр статьи "${question[0].description_question.slice(0, 10)}"`,
        question,
      })
    } else {
      response.status(404)

      return view.render('pages/error/404', {
        title: 'Error 404'
      })
    }
  }

  public async edit({ view, params }: HttpContextContract) {

  }

  public async update({}: HttpContextContract) {}

  public async destroy({ params, response, view, session }: HttpContextContract) {
    const question = await Question.find(params.id)

    if (question) {
      const article = await Article.query().where('question_id', '=', question?.id)

      await article[0].delete()
      await question.delete()

      session.flash('successmessage', `Вопрос ${question.description_question.slice(0, 60) + '...'} был удален!`)
      response.redirect('back')
    } else {
      response.status(404)

      return view.render('pages/error/404', {
        title: 'Error 404'
      })
    }
  }
}

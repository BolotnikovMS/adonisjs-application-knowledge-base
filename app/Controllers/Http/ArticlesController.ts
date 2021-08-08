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
    const article = await Article.find(params.id)

    if (article) {
      if (request.headers().referer) {
        article.url = request.headers().referer
      } else {
        article.url = '/list-program'
      }

      return article
      return view.render('pages/articles/show', {
        title: `Просмотр статьи "${article.topic}"`,
        article,
      })
    } else {
      response.status(404)
      return response.send('Error! Article is not defined!')
    }
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({ params, response }: HttpContextContract) {
    const article = await Article.find(params.id)

    console.log(article)
    if (article) {
      await article.delete()
      return response.send(`Article id:${article.id} topic:${article.topic} has been deleted!`)
    } else {
      response.status(404)
      return response.send(`Error!`)
    }
  }
}

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'

import Question from 'App/Models/Question'
import Article from 'App/Models/Article'
import Document from 'App/Models/Document'

import RequestDocumentValidator from 'App/Validators/RequestDocumentValidator'
import RequestQuestionValidator from 'App/Validators/RequestQuestionValidator'

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
    }

    session.flash('successmessage', `Тема "${validatedDataQuestion.description_question}" успешно добавлена в список.`)
    response.redirect('back')
  }

  public async storeDocument({ request, response, session }: HttpContextContract) {
    const idProgram = request.params()
    const validatedData = await request.validate(RequestDocumentValidator)

    // @ts-ignore
    validatedData.program_id = idProgram.id

    if (validatedData) {
      await uploadFile(validatedData.file)
      await uploadFile(validatedData.file_1)
      await uploadFile(validatedData.file_2)
      await uploadFile(validatedData.file_3)

      const document = {
        topic: validatedData.topic,
        file_name_old: `${validatedData.file?.clientName}`,
        file_new_name: `${validatedData.file?.fileName}`,
        file_extname: `${validatedData.file?.extname}`,
        program_id: idProgram.id,
      }

      ifNotEmpty(
        document,
        validatedData.file_1?.clientName,
        validatedData.file_1?.fileName,
        validatedData.file_1?.extname
      )
      ifNotEmpty(
        document,
        validatedData.file_2?.clientName,
        validatedData.file_2?.fileName,
        validatedData.file_2?.extname
      )
      ifNotEmpty(
        document,
        validatedData.file_3?.clientName,
        validatedData.file_3?.fileName,
        validatedData.file_3?.extname
      )

      await Document.create(document)
    }

    function ifNotEmpty(obj, str1, str2, str3) {
      if (str1 && str2 && str3) {
        return (
          (obj.file_name_old += `, ${str1}`),
          (obj.file_new_name += `, ${str2}`),
          (obj.file_extname += `, ${str3}`)
        )
      }
    }

    async function uploadFile(file) {
      await file?.move(Application.publicPath('uploads/documents'), {
        name: `${new Date().getTime()}.${file.extname}`,
      })
    }

    session.flash('successmessage', `Тема "${validatedData.topic}" успешно добавлена в список.`)
    response.redirect('back')
  }

  public async show({ view, request, response, params }: HttpContextContract) {
    const article = await Article.find(params.id)

    if (article) {
      if (request.headers().referer) {
        article.url = request.headers().referer
      } else {
        article.url = '/list-program'
      }

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

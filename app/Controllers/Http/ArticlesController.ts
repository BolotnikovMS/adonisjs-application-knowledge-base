import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { cuid } from "@ioc:Adonis/Core/Helpers";
import Application from "@ioc:Adonis/Core/Application";

import Question from "App/Models/Question";
import Article from "App/Models/Article";
import Document from "App/Models/Document";

import RequestDocumentValidator from "App/Validators/RequestDocumentValidator";
import RequestQuestionValidator from "App/Validators/RequestQuestionValidator";

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

      session.flash('successmessage', `Тема "${validatedDataQuestion.description_question}" успешно добавлена в список.`)
      response.redirect('back')
    } else {
      console.log('Error 404')
    }
  }

  public async upload({ request }: HttpContextContract) {
    if (request.ajax()) {
      const file = await request.file('image')

      await file?.move(Application.publicPath('uploads/article/img'), {
        name: `${cuid()}.${file.extname}`
      })

      return { fileUrl: file?.filePath, fileName: file?.fileName }
    }
  }

  public async storeDocument({ request, response, session }: HttpContextContract) {
    const idProgram = request.params()
    const validatedDataQuestion = await request.validate(RequestQuestionValidator)
    const validatedDataDocument = await request.validate(RequestDocumentValidator)

    if (validatedDataQuestion) {
      // @ts-ignore
      validatedDataQuestion.program_id = idProgram.id

      await Question.create(validatedDataQuestion)

      const emptyValidatedDataDocument = Object.keys(validatedDataDocument).length === 0

      if (!emptyValidatedDataDocument) {
        await uploadFile(validatedDataDocument.file)
        await uploadFile(validatedDataDocument.file_1)
        await uploadFile(validatedDataDocument.file_2)
        await uploadFile(validatedDataDocument.file_3)

        const idQuestion = await Question.query().orderBy('id', 'desc').limit(1)
        const document = {
          file_name_old: `${validatedDataDocument.file?.clientName}`,
          file_new_name: `${validatedDataDocument.file?.fileName}`,
          file_extname: `${validatedDataDocument.file?.extname}`,
          program_id: idProgram.id,
          question_id: idQuestion[0].id
        }

        ifNotEmpty(
          document,
          validatedDataDocument.file_1?.clientName,
          validatedDataDocument.file_1?.fileName,
          validatedDataDocument.file_1?.extname
        )
        ifNotEmpty(
          document,
          validatedDataDocument.file_2?.clientName,
          validatedDataDocument.file_2?.fileName,
          validatedDataDocument.file_2?.extname
        )
        ifNotEmpty(
          document,
          validatedDataDocument.file_3?.clientName,
          validatedDataDocument.file_3?.fileName,
          validatedDataDocument.file_3?.extname
        )

        await Document.create(document)
      }

      session.flash('successmessage', `Тема "${validatedDataQuestion.description_question}" успешно добавлена в список.`)
      response.redirect('back')
    } else {
      console.log('Error 404')
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

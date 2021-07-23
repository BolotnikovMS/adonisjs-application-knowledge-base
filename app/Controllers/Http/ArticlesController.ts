import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Article from 'App/Models/Article'
import RequestArticleValidator from 'App/Validators/RequestArticleValidator'
import RequestDocumentValidator from 'App/Validators/RequestDocumentValidator'

export default class ArticlesController {
  public async index({}: HttpContextContract) {}

  public async create({ view, request }: HttpContextContract) {
    const progId = request.params()

    return view.render('pages/articles/create', { title: 'Добавить тему', progId })
  }

  public async store({ request, response, session }: HttpContextContract) {
    const idProgram = request.params()
    const validatedData = await request.validate(RequestArticleValidator)

    // @ts-ignore
    validatedData.program_id = idProgram.id

    if (validatedData) {
      await Article.create(validatedData)
    }

    session.flash('successmessage', `Тема "${validatedData.topic}" успешно добавлена в список.`)
    response.redirect('back')
  }

  public async storeDocument({ request, response, session }: HttpContextContract) {
    const idProgram = request.params()
    const validatedData = await request.validate(RequestDocumentValidator)

    // @ts-ignore
    // validatedData.program_id = idProgram.id

    // if (validatedData) {
    //   await Article.create(validatedData)
    // }

    console.log(validatedData)
    console.log(request.allFiles())
    // console.log(idProgram)
    // session.flash('successmessage', `Файл "${validatedData.topic}" успешно добавлен в список.`)



    response.redirect('back')
  }

  public async show({ response, params }: HttpContextContract) {
    const article = await Article.find(params.id)

    if (article) {
      return article
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

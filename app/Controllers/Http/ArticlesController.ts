import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Article from 'App/Models/Article'

export default class ArticlesController {
  public async index({}: HttpContextContract) {
    return await Article.all()
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const article = request.only(['topic', 'description', 'program_id'])

    if (article) {
      await Article.create(article)
    }

    return response.send(`Article with topic ${article.topic} created!`)
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

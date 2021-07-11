import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Article from 'App/Models/Article'

export default class ArticlesController {
  public async index({}: HttpContextContract) {
    return await Article.all()
  }

  public async create({}: HttpContextContract) {
  }

  public async store({ request, response }: HttpContextContract) {
    const article = request.only(['topic', 'description', 'program_id'])

    if (article) {
      await Article.create(article)
    }

    return response.send(`Article with topic ${article.topic} created!`)
  }

  public async show({}: HttpContextContract) {
  }

  public async edit({}: HttpContextContract) {
  }

  public async update({}: HttpContextContract) {
  }

  public async destroy({ params, response }: HttpContextContract) {
    const article = await Article.findOrFail(params.id)

    await article.delete()

    return response.send(`Article id:${article.id} topic:${article.topic} has been deleted!`)
  }
}

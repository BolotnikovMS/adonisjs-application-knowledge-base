import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Question from 'App/Models/Question'

export default class QuestionsController {
  public async index({}: HttpContextContract) {}

  public async store({ request, response, params, logger }: HttpContextContract) {}

  public async show({ response, params, logger }: HttpContextContract) {
    const question = await Question.find(params.idQuestion)

    if (question) {
      logger.info(`Question received: ${question}.`)
      return response.send(question)
    } else {
      logger.error('The question you are trying to get does not exist...')
      return response.status(404).json({error: 'The question you are trying to get does not exist...'})
    }
  }

  public async update({}: HttpContextContract) {}

  public async destroy({ response, params, logger }: HttpContextContract) {
    const question = await Question.find(params.idQuestion)

    if (question) {
      logger.info(`Entry: ${question} removed.`)

      await question.delete()

      return response.ok({message: 'Entry removed.'})
    } else {
      logger.error(`Error: Not found.`)
      return response.notFound({ error: 'Not found.' })
    }
  }
}

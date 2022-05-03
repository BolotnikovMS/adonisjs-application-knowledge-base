import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Question from 'App/Models/Question'
import Category from 'App/Models/Category'

import RequestQuestionValidator from 'App/Validators/RequestQuestionValidator'

export default class QuestionsController {
  public async index({}: HttpContextContract) {}

  public async store({ request, response, params, logger }: HttpContextContract) {
    if (params.idCategory) {
      const category = await Category.find(params.idCategory)

      if (category) {
        try {
          const validatedData = await request.validate(RequestQuestionValidator)

          const newQuestion = {
            category_id: params.idCategory,
            ...validatedData
          }

          await Question.create(newQuestion)

          logger.info(`Adding a new question: ${newQuestion}`)
          return response.created(newQuestion)
        } catch (error) {
          logger.warn(`Error: ${error.messages}`)
          return response.badRequest(error.messages)
        }
      } else {
        logger.error('Category with this id does not exist in the database...')
        return response.badRequest({
          error: 'Category with this id does not exist in the database...',
        })
      }
    } else {
      logger.error('Category id not passed.')
      return response.badRequest({error: 'Category id not passed.'})
    }
  }

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

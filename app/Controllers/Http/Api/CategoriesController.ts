import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import WorkingDirectionValidator from 'App/Validators/WorkingDirectionValidator'

import Category from 'App/Models/Category'

export default class CategoriesController {
  public async index ({}: HttpContextContract) {
  }

  public async create ({}: HttpContextContract) {
  }

  public async store ({request, response, params, logger}: HttpContextContract) {
    if (params.idWorking) {
      try {
        const validatedData = await request.validate(WorkingDirectionValidator)

        logger.info(`Adding a new category: ${validatedData.name}.`)

        const category = {
          working_direction_id: params.idWorking,
          ...validatedData
        }

        await Category.create(category)
        return response.created(category)
      } catch (error) {
        logger.warn(`Error: ${error.messages.name}`)
        return response.badRequest(error.messages)
      }
    } else {
      logger.error('Direction "id" not passed.')
      return response.badRequest({error: 'Direction "id" not passed.'})
    }
  }

  public async show({request, response, params, logger}: HttpContextContract) {
    const category = await Category.find(params.idCategory)
    const urlParams = request.qs()

    if (!Object.keys(urlParams).length) {
      if (category) {
        logger.info(`Category data received: ${category}.`)

        return response.send(category)
      } else {
        logger.error('The category you are trying to get does not exist...')
        return response.badRequest({error: 'The category you are trying to get does not exist...'})
      }
    } else if (urlParams.question === 'true') {
      console.log(urlParams)
      if (category) {
        logger.info(`Category and questions data received: ${category}.`)

        await category.load('questions', (query) => {
          query.limit(1)
        })


        return response.send(category)
      } else {
        logger.error('The category you are trying to get does not exist...')
        return response.badRequest({error: 'The category you are trying to get does not exist...'})
      }
    } else {
      logger.error('Incorrect params.')
      return response.badRequest({error: 'Incorrect params.'})
    }
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import WorkingDirectionValidator from 'App/Validators/WorkingDirectionValidator'

import Category from 'App/Models/Category'
import WorkingDirection from 'App/Models/WorkingDirection'

import { checkObjectProperty } from '../../../../../utils/helpersFunc'

export default class CategoriesController {
  public async store({ request, response, params, logger }: HttpContextContract) {
    if (params.idWorking) {
      const working = await WorkingDirection.find(params.idWorking)

      if (working) {
        try {
          const validatedData = await request.validate(WorkingDirectionValidator)

          const newCategory = {
            working_direction_id: params.idWorking,
            ...validatedData,
          }

          await Category.create(newCategory)

          logger.info(`Adding a new category: ${newCategory}.`)
          return response.created(newCategory)
        } catch (error) {
          logger.warn(`Error: ${error.messages.name}`)
          return response.badRequest(error.messages)
        }
      } else {
        logger.error('Destination with this id does not exist in the database..')
        return response.badRequest({
          error: 'Destination with this id does not exist in the database...',
        })
      }
    } else {
      logger.error('Direction "id" not passed.')
      return response.badRequest({ error: 'Direction "id" not passed.' })
    }
  }

  public async show({ request, response, params, logger }: HttpContextContract) {
    const category = await Category.find(params.idCategory)
    const urlParams = request.qs()

    if (category) {
      if (checkObjectProperty(urlParams, 'questions') && urlParams.questions === 'true') {
        await category.load('questions', (query) => {
          query
            .limit(checkObjectProperty(urlParams, 'limit') ? +urlParams.limit : 50)
            .offset(checkObjectProperty(urlParams, 'offset') ? +urlParams.offset : 0)
        })

        logger.info(
          `Getting all the data about the category and related questions. Request parameters: limit ${
            urlParams.limit ? urlParams.limit : '--'
          }, offset ${urlParams.offset ? urlParams.offset : '--'}  .`
        )

        return response.send(category)
      }

      logger.info(`Getting all the data about the category and related questions.`)

      return response.send(category)
    } else {
      logger.error('The category you are trying to get does not exist...')
      return response
        .status(404)
        .json({ error: 'The category you are trying to get does not exist...' })
    }
  }

  public async update({ request, response, params, logger }: HttpContextContract) {
    const category = await Category.find(params.idCategory)

    if (category) {
      try {
        const validatedData = await request.validate(WorkingDirectionValidator)

        category.name = validatedData.name

        await category.save()

        logger.info(`Updated to: '${category}'`)
        return response.ok(category)
      } catch (error) {
        logger.warn(`Warn: ${error.messages.name}`)
        response.badRequest(error.messages)
      }
    } else {
      logger.error(`Error: Not found.`)
      return response.notFound({ error: 'Not found.' })
    }
  }

  public async destroy({ response, params, logger }: HttpContextContract) {
    const category = await Category.find(params.idCategory)

    if (category) {
      logger.info(`Entry: ${category} removed.`)

      await category.delete()

      return response.ok({ message: 'Entry removed.' })
    } else {
      logger.error(`Error: Not found.`)
      return response.notFound({ error: 'Not found.' })
    }
  }
}

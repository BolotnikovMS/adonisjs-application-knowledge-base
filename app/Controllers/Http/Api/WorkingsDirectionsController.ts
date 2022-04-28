import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import WorkingDirection from 'App/Models/WorkingDirection'

import {checkObjectProperty} from '../../../../utils/helpersFunc'
import WorkingDirectionValidator from 'App/Validators/WorkingDirectionValidator'

export default class WorkingsDirectionsController {
  public async index ({request, logger}: HttpContextContract) {
    const urlParams = request.qs()

    if (!Object.keys(urlParams).length) {
      logger.info('Receiving all data on directions on request.')

      return WorkingDirection.query().preload('categories')
    } else {
      logger.info(`Getting all data about directions on request with parameters: limit ${urlParams.limit ? urlParams.limit : '--'}, offset ${urlParams.offset ? urlParams.offset : '--'}  .`)

      return WorkingDirection
        .query()
        .preload('categories')
        .limit(checkObjectProperty(urlParams, 'limit') ? +urlParams.limit : 100)
        .offset(checkObjectProperty(urlParams, 'offset') ? +urlParams.offset : 0)
    }
  }

  public async create ({}: HttpContextContract) {
  }

  public async store ({request, response, logger}: HttpContextContract) {
   try {
     const validatedData = await request.validate(WorkingDirectionValidator)

     logger.info(`Adding a New Work Direction: ${validatedData.name}.`)

     await WorkingDirection.create(validatedData)

     response.created(validatedData)
     // return response.send(validatedData)
   } catch (error) {
     logger.error(`Error: ${error.messages.name}`)
     response.badRequest(error.messages)
   }
  }

  public async show ({response, params, logger}: HttpContextContract) {
    try {
      const working = await WorkingDirection.find(params.id)

      if (working) {
        await working.load('categories')

        logger.info('Data by direction and category received.')
        return working
      } else {
        logger.error('The object you are looking for does not exist...')
        response.badRequest({error: 'The object you are looking for does not exist...'})
      }
    } catch (error) {
      logger.error(error.messages)
      response.badRequest(error.messages)
    }
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({request, response, params, logger}: HttpContextContract) {
    const working = await WorkingDirection.find(params.id)

    if (working) {
      try {
        const validatedData = await request.validate(WorkingDirectionValidator)

        working.name = validatedData.name
        if (await working.save()) {
          await working.load('categories')

          response.ok(working)
        }
      } catch (error) {
        logger.error(`Error: ${error.messages.name}`)
        response.badRequest(error.messages)
      }
    } else {
      response.notFound({error: 'Not found'})
    }
  }

  public async destroy ({}: HttpContextContract) {
  }
}

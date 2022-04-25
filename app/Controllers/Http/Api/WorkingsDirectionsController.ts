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

     return validatedData
   } catch (error) {
     logger.error(`Error: ${error.messages.name}`)
     response.badRequest(error.messages)
   }
  }

  public async show ({}: HttpContextContract) {
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}

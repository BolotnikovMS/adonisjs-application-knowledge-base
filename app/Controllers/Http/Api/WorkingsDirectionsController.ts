import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import WorkingDirection from 'App/Models/WorkingDirection'

import {checkObjectProperty} from '../../../../utils/helpersFunc'
import WorkingDirectionValidator from 'App/Validators/WorkingDirectionValidator'

export default class WorkingsDirectionsController {
  public async index ({request, response, logger}: HttpContextContract) {
    const urlParams = request.qs()

    if (!Object.keys(urlParams).length) {
      logger.info('Receiving all data on directions on request.')

      const working = await WorkingDirection.query().preload('categories')

      return response.status(200).json(working)
    } else {
      logger.info(`Getting all data about directions on request with parameters: limit ${urlParams.limit ? urlParams.limit : '--'}, offset ${urlParams.offset ? urlParams.offset : '--'}  .`)

      const working = await WorkingDirection
        .query()
        .preload('categories')
        .limit(checkObjectProperty(urlParams, 'limit') ? +urlParams.limit : 100)
        .offset(checkObjectProperty(urlParams, 'offset') ? +urlParams.offset : 0)

      return response.status(200).json(working)
    }
  }

  public async create ({}: HttpContextContract) {
  }

  public async store ({request, response, logger}: HttpContextContract) {
   try {
     const validatedData = await request.validate(WorkingDirectionValidator)

     logger.info(`Adding a New Work Direction: ${validatedData.name}.`)

     await WorkingDirection.create(validatedData)

     return response.created(validatedData)
   } catch (error) {
     logger.warn(`Error: ${error.messages.name}`)
     return response.badRequest(error.messages)
   }
  }

  public async show ({response, params, logger}: HttpContextContract) {
    const working = await WorkingDirection.find(params.idWorking)

    if (working) {
      await working.load('categories')

      logger.info('Data by direction and category received.')
      return response.send(working)
    } else {
      logger.warn('The direction you are trying to get does not exist...')
      return response.badRequest({error: 'The direction you are trying to get does not exist...'})
    }
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({request, response, params, logger}: HttpContextContract) {
    const working = await WorkingDirection.find(params.idWorking)

    if (working) {
      try {
        const validatedData = await request.validate(WorkingDirectionValidator)

        working.name = validatedData.name

        logger.info(`Updated to: '${validatedData.name}'`)
        if (await working.save()) {
          await working.load('categories')

          return response.ok(working)
        }

        return
      } catch (error) {
        logger.error(`Error: ${error.messages.name}`)
        response.badRequest(error.messages)
      }
    } else {
      logger.warn(`Error: Not found.`)
      return response.notFound({error: 'Not found.'})
    }
  }

  public async destroy ({response, params, logger}: HttpContextContract) {
    const working = await WorkingDirection.find(params.idWorking)

    if (working) {
      logger.info(`Entry: ${working} removed.`)

      await working.delete()

      return response.ok('Entry removed.')
    } else {
      logger.warn(`Error: Not found.`)
      return response.notFound({error: 'Not found.'})
    }
  }
}

import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import ProgramList from 'App/Models/ProgramList'

export default class ProgramListsController {
  public async index({}: HttpContextContract) {
    const programlist = await  ProgramList
      .query()
      .preload('article')

    return programlist
  }

  public async create({}: HttpContextContract) {
  }

  public async store({ request }: HttpContextContract) {
    const program = request.only(['name'])

    if (program) {
      await ProgramList.create(program)
    }
  }

  public async show({}: HttpContextContract) {
  }

  public async edit({}: HttpContextContract) {
  }

  public async update({}: HttpContextContract) {
  }

  public async destroy({}: HttpContextContract) {
  }
}

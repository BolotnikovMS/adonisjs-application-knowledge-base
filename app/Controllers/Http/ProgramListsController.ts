import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ProgramList from 'App/Models/ProgramList'

export default class ProgramListsController {
  public async index({ view }: HttpContextContract) {
    const program = await ProgramList.query().preload('article')

    return view.render('pages/programs/index', {
      title: 'Список программ',
      program
    })
  }

  public async create({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    const program = request.only(['name'])

    if (program) {
      await ProgramList.create(program)
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({ params, response }: HttpContextContract) {
    const program = await ProgramList.findOrFail(params.id)

    await program.delete()

    return response.send(`Program: id:${program.id} topic:${program.name} has been deleted!`)
  }
}

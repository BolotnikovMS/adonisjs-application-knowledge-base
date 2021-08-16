import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import ProgramList from 'App/Models/ProgramList'
import Question from 'App/Models/Question'

export default class SearchesController {
  public async searchInProgram({ request, view }: HttpContextContract) {
    const validSchema = schema.create({
      search: schema.string({trim: true, escape: true}, [
        rules.minLength(3)
      ])
    })
    const messages = {
      'search.required': 'Поле является обязательным.',
      'search.minLength': 'Минимальная длинна поля 3 символа.',
    }
    const validateData = await request.validate({
      schema: validSchema,
      messages: messages
    })

    const search = validateData.search.split(' ')
    let searchResult
    let searchStr: string = ''

    await search.forEach((part) => {
      searchStr += `${part} `
    })

    if (search.length >= 1) {
      searchResult = await ProgramList.query()
        .where((query) => {
          query
            .where('name', 'like', `%${searchStr}%`)
            .orWhere('name', 'like', `%${searchStr}`)
            .orWhere('name', 'like', `${searchStr}%`)
        })
    }

    return view.render('pages/programs/search', {
      title: 'Результаты поиска',
      searchResult,
      searchStr
    })
  }
}

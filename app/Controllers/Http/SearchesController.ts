import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ProgramList from 'App/Models/ProgramList'
import Question from 'App/Models/Question'

import RequestSearchValidator from 'App/Validators/RequestSearchValidator'

export default class SearchesController {
  public async searchInProgram({ request, view }: HttpContextContract) {
    const validateData = await request.validate(RequestSearchValidator)

    const search = validateData.search.split(' ')
    let searchResult

    if (search.length >= 1) {
      searchResult = await ProgramList.query()
        .where((query) => {
          query
            .where('name', 'like', `%${validateData.search}%`)
            .orWhere('name', 'like', `%${validateData.search}`)
            .orWhere('name', 'like', `${validateData.search}%`)
        })
    }

    return view.render('pages/programs/search', {
      title: 'Результаты поиска',
      searchResult,
      searchStr: validateData.search
    })
  }

  public async searchInQuestion({ request, view }: HttpContextContract) {
    const validateData = await request.validate(RequestSearchValidator)

    const search = validateData.search.split(' ')
    let searchResult

    if (search.length >= 1) {
      searchResult = await Question.query()
        .where((query) => {
          query
            .where('description_question', 'like', `%${validateData.search}%`)
            .orWhere('description_question', 'like', `%${validateData.search}`)
            .orWhere('description_question', 'like', `${validateData.search}%`)
        })
    }

    return view.render('pages/articles/search', {
      title: 'Результаты поиска',
      searchResult,
      searchStr: validateData.search
    })
  }
}

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ProgramList from 'App/Models/ProgramList'
import Question from 'App/Models/Question'

import RequestSearchValidator from 'App/Validators/RequestSearchValidator'

export default class SearchesController {
  public async searchInProgram({ request, response, session, view }: HttpContextContract) {
    const validatedData = await request.validate(RequestSearchValidator)

    for (const validatedDataKey in validatedData) {
      if (!validatedData[validatedDataKey]) {
        delete validatedData[validatedDataKey]
      }
    }

    if (Object.keys(validatedData).length === 0) {
      session.flash('dangermessage', `Введенно пустое значение в поле название.`)
      response.redirect('/list-program/')
    } else {
      if (validatedData.hasOwnProperty('search')) {
        const search = validatedData.search.split(' ')
        let searchResult

        if (search.length >= 1) {
          searchResult = await ProgramList.query().where((query) => {
            query
              .where('name', 'like', `%${validatedData.search}%`)
              .orWhere('name', 'like', `%${validatedData.search}`)
              .orWhere('name', 'like', `${validatedData.search}%`)
          })
        }

        return view.render('pages/programs/search', {
          title: 'Результаты поиска',
          searchResult,
          searchStr: validatedData.search,
        })
      }
    }
  }

  public async searchInQuestion({ request, response, view, session }: HttpContextContract) {
    const validatedData = await request.validate(RequestSearchValidator)

    for (const validatedDataKey in validatedData) {
      if (!validatedData[validatedDataKey]) {
        delete validatedData[validatedDataKey]
      }
    }

    if (Object.keys(validatedData).length === 0) {
      session.flash('dangermessage', `Введенно пустое значение в поле название.`)
      response.redirect('back')
    } else {
      if (validatedData.hasOwnProperty('search')) {
        const search = validatedData.search.split(' ')
        let searchResult

        if (search.length >= 1) {
          searchResult = await Question.query().where((query) => {
            query
              .where('description_question', 'like', `%${validatedData.search}%`)
              .orWhere('description_question', 'like', `%${validatedData.search}`)
              .orWhere('description_question', 'like', `${validatedData.search}%`)
          })
        }

        return view.render('pages/articles/search', {
          title: 'Результаты поиска',
          searchResult,
          searchStr: validatedData.search,
        })
      }
    }
  }
}

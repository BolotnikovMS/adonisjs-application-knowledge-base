import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import WorkingDirection from 'App/Models/WorkingDirection'
import Category from 'App/Models/Category'
import Question from 'App/Models/Question'

import RequestSearchValidator from 'App/Validators/RequestSearchValidator'

export default class SearchesController {
  public async searchInWorking({request, response, session, view}: HttpContextContract) {
    const validatedData = await request.validate(RequestSearchValidator)

    if (validatedData.searchSetting === 'course') {
      const searchResultArray: object[] = []
      const searchArray = await validatedData.search.split(' ')

      for (let i = 0; i < searchArray.length; i++) {
        let reqResult = await WorkingDirection.query().select('id', 'name').where('name', 'like', `%${searchArray[i]}%`)

        if (searchResultArray.length === 0) {
          searchResultArray.push(reqResult)
        }
      }

      return view.render('pages/searchresults', {
        title: `Результаты поиска по: '${validatedData.search}'`,
        searchResults: searchResultArray.flat(),
        urlSetting: 'working_directions.show'
      })
    } else if (validatedData.searchSetting === 'category') {
      const searchResultArray: object[] = []
      const searchArray = await validatedData.search.split(' ')

      for (let i = 0; i < searchArray.length; i++) {
        let reqResult = await Category.query().select('id', 'name').where('name', 'like', `%${searchArray[i]}%`)

        if (searchResultArray.length === 0) {
          searchResultArray.push(reqResult)
        }
      }

      // const searchResults = await Category.query().where('name', 'like', `%${validatedData.search}%`)

      return view.render('pages/searchresults', {
        title: `Результаты поиска по: '${validatedData.search}'`,
        searchResults: searchResultArray.flat(),
        urlSetting: 'category.show'
      })
    } else if (validatedData.searchSetting === 'question') {
      const searchResultArray: object[] = []
      const searchArray = await validatedData.search.split(' ')

      for (let i = 0; i < searchArray.length; i++) {
        let reqResult = await Question.query().select('id', 'question').where('question', 'like', `%${searchArray[i]}%`).orWhere('description_question', 'like', `%${searchArray[i]}%`)

        if (searchResultArray.length === 0) {
          searchResultArray.push(reqResult)
        }
      }

      return view.render('pages/searchresults', {
        title: `Результаты поиска по: '${validatedData.search}'`,
        searchResults: searchResultArray.flat(),
        urlSetting: 'question.show'
      })
    } else {
      console.log('Invalid search parameter')

      session.flash('dangermessage', `Некорректный параметр поиска.`)
      response.redirect().toRoute('WorkingDirectionsController.index')
    }
  }
}

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
        searchResultArray.push(await WorkingDirection.query().select('id', 'name').where('name', 'like', `%${searchArray[i]}%`))
      }

      return view.render('pages/searchresults', {
        title: `Результаты поиска по: '${validatedData.search}'`,
        searchResults: searchResultArray.flat()
      })
    } else if (validatedData.searchSetting === 'category') {
      const searchResultArray: object[] = []
      const searchArray = await validatedData.search.split(' ')

      for (let i = 0; i < searchArray.length; i++) {
        searchResultArray.push(await Category.query().select('id', 'name').where('name', 'like', `%${searchArray[i]}%`))
      }

      // const searchResults = await Category.query().where('name', 'like', `%${validatedData.search}%`)

      return view.render('pages/searchresults', {
        title: `Результаты поиска по: '${validatedData.search}'`,
        searchResults: searchResultArray.flat()
      })
    } else if (validatedData.searchSetting === 'question') {
      const searchResultArray: object[] = []
      const searchArray = await validatedData.search.split(' ')

      for (let i = 0; i < searchArray.length; i++) {
        searchResultArray.push(await Question.query().select('id', 'question').where('question', 'like', `%${searchArray[i]}%`).orWhere('description_question', 'like', `%${searchArray[i]}%`))
      }

      // const filterArr = new Map()
      // searchResultArray.flat().map(item => filterArr.set(item.id, item))
      //
      // return {
      //   searchResults: [...filterArr]
      // }
return searchResultArray.flat()
      return view.render('pages/searchresults', {
        title: `Результаты поиска по: '${validatedData.search}'`,
        searchResults: searchResultArray.flat()
      })
    } else {
      console.log('Invalid search parameter')

      session.flash('dangermessage', `Некорректный параметр поиска.`)
      response.redirect().toRoute('WorkingDirectionsController.index')
    }
  }

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

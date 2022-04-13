import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Question from 'App/Models/Question'

import RequestQuestionValidator from 'App/Validators/RequestQuestionValidator'
import RequestFileValidator from 'App/Validators/RequestFileValidator'
import Application from '@ioc:Adonis/Core/Application'
import {cuid} from '@ioc:Adonis/Core/Helpers'

export default class QuestionsController {
  public async index ({}: HttpContextContract) {
  }

  public async create ({view, params}: HttpContextContract) {
    return view.render('pages/questions/formQuestion', {
      title: 'Добавить новый вопрос',
      settings: {
        formAction: 'question.store',
        operationTypeBtn: 'Добавить',
        paramsId: {
          idCategory: params.id
        }
      }
    })
  }

  public async store ({request, response, params, session}: HttpContextContract) {
    const idCategory = params.id
    const validatedDataQuestion = await request.validate(RequestQuestionValidator)
    validatedDataQuestion.category_id = idCategory

    await Question.create(validatedDataQuestion)

    session.flash('successmessage',`Вопрос "${validatedDataQuestion.question}" успешно добавлен.`)
    response.redirect().toRoute('CategoriesController.show', {id: idCategory})
  }

  public async upload({ request }: HttpContextContract) {
    if (request.ajax()) {
      const validatedFile = await request.validate(RequestFileValidator)
      let path

      if (validatedFile.file !== undefined) {
        if (validatedFile.file.type === 'application') {
          path = 'uploads/article/file'
        } else if (validatedFile.file.type === 'image') {
          path = 'uploads/article/img'
        } else {
          path = 'uploads/article/other'
        }

        await validatedFile.file.move(Application.publicPath(path), {
          name: `${cuid().substring(1, 25)}.${validatedFile.file.extname}`,
        })

        return { fileName: validatedFile.file.fileName, clientName: validatedFile.file.clientName }
      } else {
        console.log('File is undefined')
      }
    }
  }

  public async show ({request, response, view, params, session}: HttpContextContract) {
    const question = await Question.find(params.id)

    if (question === null) {
      session.flash(
        'dangermessage',
        'Такого вопроса нет!'
      )
      return response.redirect().toRoute('WorkingDirectionsController.index')
    }

    if (request.headers().referer) {
      question.url = request.headers().referer
    } else {
      question.url = '/'
    }

    return view.render('pages/questions/show', {
      title: `Просмотр статьи "${question.question.slice(0, 20)}"`,
      question,
    })
  }

  public async edit ({response, view, params}: HttpContextContract) {
    const question = await Question.find(params.id)

    if (question) {
      return view.render('pages/questions/formQuestion', {
        title: 'Редактирование',
        settings: {
          formAction: 'question.update',
          operationTypeBtn: 'Сохранить',
          paramsId: {
            idQuestion: params.id,
            idCategory: question.category_id
          }
        },
        question
      })

    } else {
      response.status(404)

      return view.render('pages/error/404', {
        title: 'Error 404',
      })
    }
  }

  public async update ({request, response, params, view, session}: HttpContextContract) {
    const question = await Question.find(params.id)

    if (question) {
      const validatedData = await request.validate(RequestQuestionValidator)

      question.question = validatedData.question
      question.description_question = validatedData.description_question

      await question.save()

      session.flash('successmessage', `Данные "${question.question}" успешно обновлены.`)
      response.redirect().toRoute('CategoriesController.show', {id: question.category_id})

    } else {
      response.status(404)

      return view.render('pages/error/404', {
        title: 'Error 404',
      })
    }
  }

  public async destroy ({params, response, view, session}: HttpContextContract) {
    const question = await Question.find(params.id)

    if (question !== null) {
      await question.delete()

      session.flash(
        'successmessage',
        `Вопрос ${question.question.slice(0, 60) + '...'} был удален!`
      )
      response.redirect('back')
    } else {
      response.status(404)

      return view.render('pages/error/404', {
        title: 'Error 404',
      })
    }
  }
}

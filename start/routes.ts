/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('pages/index')
}).as('index')

Route.group(() => {
  Route.get('/', 'WorkingDirectionsController.index').as('working_directions.index')
  // Route.get('/new', 'WorkingDirectionsController.create').as('working_directions.create')
  Route.post('/store', 'WorkingDirectionsController.store').as('working_directions.store')
  Route.get('/:id/categories', 'WorkingDirectionsController.show').as('working_directions.show')
  Route.get('/edit/:id', 'WorkingDirectionsController.edit').as('working_directions.edit')
  Route.post('/edit/:id', 'WorkingDirectionsController.update').as('working_directions.update')
  Route.get('/delete/:id', 'WorkingDirectionsController.destroy').as('working_directions.destroy')
}).prefix('working-directions')

Route.group(() => {
  // Route.get('/', 'CategoriesController.index').as('index.categories')
  // Route.get('/new/:workingDirId', 'CategoriesController.create').as('category.create')
  Route.post('/store/:workingDirId', 'CategoriesController.store').as('category.store')
  Route.get('/:id/questions', 'CategoriesController.show').as('category.show')
  Route.get('/edit/:id', 'CategoriesController.edit').as('category.edit')
  Route.post('/edit/:id', 'CategoriesController.update').as('category.update')
  Route.get('/delete/:id', 'CategoriesController.destroy').as('category.destroy')
}).prefix('categories')

Route.group(() => {
  Route.get('/show-one/:id', 'QuestionsController.show').as('question.show')
  Route.get('/category/:id', 'QuestionsController.create').as('question.create')
  Route.post('/category/:id', 'QuestionsController.store').as('question.store')
  Route.post('/summernote-upload', 'QuestionsController.upload').as('upload.summernote')
  Route.get('/delete/:id', 'QuestionsController.destroy').as('question.destroy')
}).prefix('questions')

Route.group(() => {
   Route.get('/search', 'SearchesController.searchInProgram').as('search.program')
}).prefix('list-program')

Route.group(() => {
  // Route.get('/', 'ArticlesController.index').as('index.article')
  Route.get('/show/:id/new-article', 'ArticlesController.create').as('create.article')
  Route.post('/show/:id/new-article', 'ArticlesController.store').as('store.article')
  // Route.post('/summernote-upload', 'ArticlesController.upload').as('upload.summernote')
  Route.get('/show/:id', 'ArticlesController.show').as('show.question.article')
  Route.get('edit/:id', 'ArticlesController.edit').as('edit.question.article')
  Route.post('edit/:id', 'ArticlesController.update').as('update.question.article')
  Route.get('/delete/:id', 'ArticlesController.destroy').as('destroy.question.article')

  Route.get('/search', 'SearchesController.searchInQuestion').as('search.question')
}).prefix('article')

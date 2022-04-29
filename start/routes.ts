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
  Route.get('/new', 'WorkingDirectionsController.create').as('working_directions.create')
  Route.post('/store', 'WorkingDirectionsController.store').as('working_directions.store')
  Route.get('/:id/categories', 'WorkingDirectionsController.show').as('working_directions.show')
  Route.get('/edit/:id', 'WorkingDirectionsController.edit').as('working_directions.edit')
  Route.post('/edit/:id', 'WorkingDirectionsController.update').as('working_directions.update')
  Route.get('/delete/:id', 'WorkingDirectionsController.destroy').as('working_directions.destroy')
})
  .prefix('workings-directions')

Route.group(() => {
  // Route.get('/', 'CategoriesController.index').as('index.categories')
  Route.get('/new/:workingDirId', 'CategoriesController.create').as('category.create')
  Route.post('/store/:workingDirId', 'CategoriesController.store').as('category.store')
  Route.get('/:id/questions', 'CategoriesController.show').as('category.show')
  Route.get('/edit/:id', 'CategoriesController.edit').as('category.edit')
  Route.post('/edit/:id', 'CategoriesController.update').as('category.update')
  Route.get('/delete/:id', 'CategoriesController.destroy').as('category.destroy')
})
  .prefix('categories')

Route.group(() => {
  Route.get('/show-one/:id', 'QuestionsController.show').as('question.show')
  Route.get('/category/:id', 'QuestionsController.create').as('question.create')
  Route.post('/category/:id', 'QuestionsController.store').as('question.store')
  Route.get('/category/question/edit/:id', 'QuestionsController.edit').as('question.edit')
  Route.post('/category/question/edit/:id', 'QuestionsController.update').as('question.update')
  Route.post('/summernote-upload', 'QuestionsController.upload').as('upload.summernote')
  Route.get('/delete/:id', 'QuestionsController.destroy').as('question.destroy')
})
  .prefix('questions')

Route.group(() => {
   Route.get('/search', 'SearchesController.searchInWorking').as('working.search')
})

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'WorkingsDirectionsController.index')
    Route.post('/', 'WorkingsDirectionsController.store')
    Route.get('/:idWorking/categories', 'WorkingsDirectionsController.show')
    Route.patch('/:idWorking', 'WorkingsDirectionsController.update')
    Route.delete('/:idWorking', 'WorkingsDirectionsController.destroy')

    Route.post('/:idWorking/new-category', 'CategoriesController.store')
  }).prefix('workings-directions')
})
  .namespace('App/Controllers/Http/Api')
  .prefix('api/v1.0')

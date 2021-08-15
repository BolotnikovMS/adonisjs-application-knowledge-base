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
  Route.get('/', 'ProgramListsController.index').as('index.program')
  Route.get('/new', 'ProgramListsController.create').as('create.program')
  Route.post('/new', 'ProgramListsController.store').as('store.program')
  Route.get('/show/:id', 'ProgramListsController.show').as('show.program')
  Route.get('/edit/:id', 'ProgramListsController.edit').as('edit.program')
  Route.post('/edit/:id', 'ProgramListsController.update').as('update.program')
  Route.get('/delete/:id', 'ProgramListsController.destroy').as('destroy.program')
  Route.get('/search', 'ProgramListsController.search').as('search.program')
}).prefix('list-program')

Route.group(() => {
  // Route.get('/', 'ArticlesController.index').as('index.article')
  Route.get('/show/:id/new-article', 'ArticlesController.create').as('create.article')
  Route.post('/show/:id/new-article', 'ArticlesController.store').as('store.article')
  Route.post('/summernote-upload', 'ArticlesController.upload').as('upload.summernote')
  Route.get('/show/:id', 'ArticlesController.show').as('show.question.article')
  Route.get('edit/:id', 'ArticlesController.edit').as('edit.question.article')
  Route.post('edit/:id', 'ArticlesController.update').as('update.question.article')
  Route.get('/delete/:id', 'ArticlesController.destroy').as('destroy.question.article')
}).prefix('article')

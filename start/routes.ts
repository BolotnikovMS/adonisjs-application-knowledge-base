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
  return view.render('welcome')
})

Route.get('/news', async ({ view }) => {
  return view.render('pages/welc', {
    title: 'New',
  })
})

Route.group(() => {
  Route.get('/', 'ProgramListsController.index').as('index.program')
  Route.post('/new', 'ProgramListsController.store').as('store.program')
  Route.post('/delete/:id', 'ProgramListsController.destroy').as('destroy.program')
}).prefix('list-program')

Route.group(() => {
  Route.get('/', 'ArticlesController.index').as('index.article')
  Route.post('/new', 'ArticlesController.store').as('store.article')
  Route.delete('/delete/:id', 'ArticlesController.destroy').as('destroy.article')
}).prefix('article')

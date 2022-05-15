import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'WorkingsDirectionsController.index')
    Route.post('/', 'WorkingsDirectionsController.store')
    Route.get('/:idWorking/categories', 'WorkingsDirectionsController.show')
    Route.patch('/:idWorking', 'WorkingsDirectionsController.update')
    Route.delete('/:idWorking', 'WorkingsDirectionsController.destroy')

    Route.post('/:idWorking/new-category', 'CategoriesController.store')
  }).prefix('workings-directions')

  Route.group(() => {
    Route.get('/:idCategory', 'CategoriesController.show')
    Route.patch('/:idCategory', 'CategoriesController.update')
    Route.delete('/:idCategory', 'CategoriesController.destroy')

    Route.post('/:idCategory/new-question', 'QuestionsController.store')
  }).prefix('categories')

  Route.group(() => {
    Route.get('/:idQuestion', 'QuestionsController.show')
    Route.patch('/:idQuestion', 'QuestionsController.update')
    Route.delete('/:idQuestion', 'QuestionsController.destroy')
  }).prefix('questions')
})
  .namespace('App/Controllers/Http/Api/v1.0')
  .prefix('api/v1.0')

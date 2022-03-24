import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Articles extends BaseSchema {
  protected tableName = 'articles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('category_id', 10)
        .unsigned()
        .index()
        .notNullable()
        .references('categories.id')
        .onDelete('CASCADE')
      table
        .integer('question_id', 10)
        .unsigned()
        .index()
        .notNullable()
        .references('questions.id')
        .onDelete('CASCADE')
      table.text('description').nullable()

      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

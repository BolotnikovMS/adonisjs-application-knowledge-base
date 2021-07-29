import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Articles extends BaseSchema {
  protected tableName = 'articles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('program_id', 10)
        .index()
        .notNullable()
        .references('program_lists.id')
        .onDelete('CASCADE')
      table
        .integer('question_id', 10)
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

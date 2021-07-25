import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Documents extends BaseSchema {
  protected tableName = 'documents'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('topic', 255).notNullable()
      table.string('file_name_old', 255).notNullable()
      table.string('file_new_name', 255).notNullable()
      table.string('file_extname', 60).nullable()
      table
        .integer('program_id', 10)
        .index()
        .notNullable()
        .references('program_lists.id')
        .onDelete('CASCADE')

      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

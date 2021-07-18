import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProgramLists extends BaseSchema {
  protected tableName = 'program_lists'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.string('description', 500).nullable()
      table.string('site', 200).nullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

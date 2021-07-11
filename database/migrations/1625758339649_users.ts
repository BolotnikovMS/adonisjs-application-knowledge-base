import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('surname', 255).notNullable()
      table.string('name', 255).notNullable()
      table.string('lastname', 255).notNullable()
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.integer('role_id', 10).notNullable().defaultTo(2)
      table
        .integer('role_id').notNullable().defaultTo(2)
        .references('role.id')
        .onDelete('CASCADE') // delete post when user is deleted

      table.boolean('active').defaultTo(1)
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

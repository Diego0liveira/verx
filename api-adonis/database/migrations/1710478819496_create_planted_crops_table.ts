import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'planted_crops'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()
      table.string('name', 50).notNullable().comment('The name of the planted crop.')
      table
        .timestamp('created_at')
        .defaultTo(this.now())
        .comment('The timestamp when the record was created.')
      table
        .timestamp('updated_at')
        .defaultTo(this.now())
        .comment('The timestamp when the record was last updated.')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

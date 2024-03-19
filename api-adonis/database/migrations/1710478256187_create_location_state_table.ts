import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'location_states'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()
      table.string('full_name', 100).notNullable().comment('Full name of the state')
      table.string('short_name', 2).notNullable().comment('Short name of the state')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

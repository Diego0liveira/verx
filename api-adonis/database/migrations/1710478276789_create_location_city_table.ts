import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'location_cities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary().comment('The unique identifier of the city')
      table.string('name', 100).notNullable().comment('The name of the city')
      table
        .bigInteger('location_state_id')
        .notNullable()
        .comment('The foreign key referencing the location state')
      table
        .foreign('location_state_id')
        .references('id')
        .inTable('location_states')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

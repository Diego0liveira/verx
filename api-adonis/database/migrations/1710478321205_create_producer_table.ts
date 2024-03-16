import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'producer'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()
      table
        .string('document', 14)
        .notNullable()
        .comment('The document number of the producer CPF or CNPJ')
      table.string('producer_name', 100).notNullable().comment('The name of the producer')
      table.string('farm_name', 100).notNullable().comment('The name of the farm')
      table.decimal('total_area', 10, 2).notNullable().comment('The total area of the farm')
      table.decimal('arable_area', 10, 2).notNullable().comment('The arable area of the farm')
      table
        .decimal('vegetation_area', 10, 2)
        .notNullable()
        .comment('The vegetation area of the farm')
      table
        .timestamp('created_at')
        .defaultTo(this.now())
        .comment('The date and time the record was created')
      table
        .timestamp('updated_at')
        .defaultTo(this.now())
        .comment('The date and time the record was updated')
      table
        .foreign('location_city_id')
        .references('id')
        .inTable('location_city')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .comment('The city where the farm is located')
      table
        .foreign('location_state_id')
        .references('id')
        .inTable('location_states')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .comment('The state where the farm is located')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

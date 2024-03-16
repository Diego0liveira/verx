import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'producer_planted_crops'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()
      table
        .bigInteger('producer_id')
        .notNullable()
        .comment('The foreign key referencing the producer')
      table
        .bigInteger('planted_crops_id')
        .notNullable()
        .comment('The foreign key referencing the planted crops')
      table
        .timestamp('created_at')
        .defaultTo(this.now())
        .comment('The timestamp when the record was created.')
      table
        .foreign('planted_crops_id')
        .references('id')
        .inTable('planted_crops')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .comment('The foreign key constraint for the planted crops')
      table
        .foreign('producer_id')
        .references('id')
        .inTable('producer')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .comment('The foreign key constraint for the producer')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

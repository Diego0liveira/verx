import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'planted_crops_producer'

  async up() {
    await this.insertData([
      { producer_id: 1, planted_crops_id: 2 },
      { producer_id: 2, planted_crops_id: 1 },
      { producer_id: 3, planted_crops_id: 5 },
      { producer_id: 4, planted_crops_id: 2 },
      { producer_id: 5, planted_crops_id: 3 },
      { producer_id: 6, planted_crops_id: 5 },
      { producer_id: 7, planted_crops_id: 4 },
      { producer_id: 8, planted_crops_id: 1 },
      { producer_id: 1, planted_crops_id: 1 },
      { producer_id: 3, planted_crops_id: 8 },
      { producer_id: 3, planted_crops_id: 6 },
      { producer_id: 3, planted_crops_id: 2 },
      { producer_id: 4, planted_crops_id: 5 },
      { producer_id: 7, planted_crops_id: 1 },
      { producer_id: 8, planted_crops_id: 3 },
      { producer_id: 8, planted_crops_id: 4 },
    ])
  }

  async down() {
    await this.db.from(this.tableName).del()
  }

  private async insertData(data: any[]) {
    for (const row of data) {
      await this.db.table(this.tableName).insert(row)
    }
  }
}

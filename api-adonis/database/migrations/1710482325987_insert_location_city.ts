import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'location_city'

  async up() {
    await this.insertData([
      { name: 'São Paulo', location_state_id: 1 },
      { name: 'Campinas', location_state_id: 1 },
      { name: 'Rio de Janeiro', location_state_id: 2 },
      { name: 'Belo Horizonte', location_state_id: 3 },
      { name: 'Salvador', location_state_id: 4 },
      { name: 'Curitiba', location_state_id: 5 },
      { name: 'Porto Alegre', location_state_id: 6 },
      { name: 'Brasília', location_state_id: 7 },
      { name: 'Fortaleza', location_state_id: 8 },
      { name: 'Goiânia', location_state_id: 9 },
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

import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'location_states'

  async up() {
    await this.insertData([
      { full_name: 'São Paulo', short_name: 'SP' },
      { full_name: 'Rio de Janeiro', short_name: 'RJ' },
      { full_name: 'Minas Gerais', short_name: 'MG' },
      { full_name: 'Bahia', short_name: 'BA' },
      { full_name: 'Paraná', short_name: 'PR' },
      { full_name: 'Rio Grande do Sul', short_name: 'RS' },
      { full_name: 'Santa Catarina', short_name: 'SC' },
      { full_name: 'Goiás', short_name: 'GO' },
      { full_name: 'Ceará', short_name: 'CE' },
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

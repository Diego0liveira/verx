import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'planted_crops'

  async up() {
    await this.insertData([
      { name: 'Soja' },
      { name: 'Milho' },
      { name: 'Algodão' },
      { name: 'Café' },
      { name: 'Cana-de-açúcar' },
      { name: 'Trigo' },
      { name: 'Arroz' },
      { name: 'Feijão' },
      { name: 'Tomate' },
      { name: 'Batata' },
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

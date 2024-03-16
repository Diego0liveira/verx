import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'producer'

  async up() {
    await this.insertData([
      {
        document: '12345678901',
        producer_name: 'Produtor 1',
        farm_name: 'Fazenda 1',
        total_area: 1000.0,
        arable_area: 500.0,
        vegetation_area: 500.0,
      },
      {
        document: '98765432109',
        producer_name: 'Produtor 2',
        farm_name: 'Fazenda 2',
        total_area: 1500.0,
        arable_area: 700.0,
        vegetation_area: 800.0,
      },
      {
        document: '56789012345',
        producer_name: 'Produtor 3',
        farm_name: 'Fazenda 3',
        total_area: 2000.0,
        arable_area: 1000.0,
        vegetation_area: 1000.0,
      },
      {
        document: '1357924680',
        producer_name: 'Produtor 4',
        farm_name: 'Fazenda 4',
        total_area: 1200.0,
        arable_area: 600.0,
        vegetation_area: 600.0,
      },
      {
        document: '2468013579',
        producer_name: 'Produtor 5',
        farm_name: 'Fazenda 5',
        total_area: 1800.0,
        arable_area: 900.0,
        vegetation_area: 900.0,
      },
      {
        document: '98765432100',
        producer_name: 'Produtor 6',
        farm_name: 'Fazenda 6',
        total_area: 2500.0,
        arable_area: 1300.0,
        vegetation_area: 1200.0,
      },
      {
        document: '12345678910',
        producer_name: 'Produtor 7',
        farm_name: 'Fazenda 7',
        total_area: 3000.0,
        arable_area: 1500.0,
        vegetation_area: 1500.0,
      },
      {
        document: '13579246801',
        producer_name: 'Produtor 8',
        farm_name: 'Fazenda 8',
        total_area: 2200.0,
        arable_area: 1100.0,
        vegetation_area: 1100.0,
      },
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

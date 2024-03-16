import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class LocationState extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string

  @column()
  declare shortName: string
}

import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import LocationCity from './location_city.js'
import LocationState from './location_state.js'
import PlantedCrops from './planted_crops.js'

export default class Producer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare document: string

  @column()
  declare producerName: string

  @column()
  declare farmName: string

  @column()
  declare totalArea: number

  @column()
  declare arableArea: number

  @column()
  declare vegetationArea: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare locationCityId: number

  @belongsTo(() => LocationCity)
  declare locationCity: relations.BelongsTo<typeof LocationCity>

  @column()
  declare locationStateId: number

  @belongsTo(() => LocationState)
  declare locationState: relations.BelongsTo<typeof LocationState>

  @manyToMany(() => PlantedCrops)
  declare plantedCrops: relations.ManyToMany<typeof PlantedCrops>
}

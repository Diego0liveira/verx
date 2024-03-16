import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import PlantedCrops from './planted_crops.js'
import Producer from './producer.js'

export default class ProducerPlantedCrop extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare producerId: number

  @column()
  declare plantedCropsId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => Producer)
  declare producer: relations.BelongsTo<typeof Producer>

  @belongsTo(() => PlantedCrops)
  declare plantedCrop: relations.BelongsTo<typeof PlantedCrops>
}

import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'
import LocationState from './location_state.js'

export default class LocationCity extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare locationStateId: number

  @belongsTo(() => LocationState)
  declare state: relations.BelongsTo<typeof LocationState>
}

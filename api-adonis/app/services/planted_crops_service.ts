import PlantedCrops from '#models/planted_crops'
import { inject } from '@adonisjs/core'

@inject()
export default class PlantedCropsService {
  async all() {
    return PlantedCrops.all()
  }
}

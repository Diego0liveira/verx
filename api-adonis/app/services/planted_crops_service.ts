import PlantedCrops from '#models/planted_crops'
import { inject } from '@adonisjs/core'

@inject()
export default class PlantedCropsService {
  /**
   * Retrieves all planted crops.
   * @returns {Promise<PlantedCrops[]>} A promise that resolves to an array of planted crops.
   */
  async index(): Promise<PlantedCrops[]> {
    return PlantedCrops.all()
  }
}

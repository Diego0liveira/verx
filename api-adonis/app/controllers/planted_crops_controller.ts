import PlantedCrops from '#models/planted_crops'
import PlantedCropsService from '#services/planted_crops_service'
import { inject } from '@adonisjs/core'
@inject()
export default class PlantedCropsController {
  constructor(private plantedCropsService: PlantedCropsService) {}
  /**
   * Retrieves a list of planted crops.
   * @returns {PPromise<PlantedCrops[]} The list of planted crops.
   */
  async index(): Promise<PlantedCrops[]> {
    return this.plantedCropsService.index()
  }
}

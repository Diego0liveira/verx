import PlantedCropsService from '#services/planted_crops_service'

export default class PlantedCropsController {
  constructor(private plantedCropsService: PlantedCropsService) {}
  async index(ctx: any) {
    return this.plantedCropsService.all()
  }
}

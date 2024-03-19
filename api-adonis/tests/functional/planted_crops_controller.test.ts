import PlantedCropsService from '#services/planted_crops_service'
import { expect } from 'chai'
import { beforeEach, describe, it } from 'node:test'
import PlantedCropsController from '../../app/controllers/planted_crops_controller.js'

describe('PlantedCropsController', () => {
  let plantedCropsController: PlantedCropsController
  let plantedCropsService: PlantedCropsService

  beforeEach(() => {
    plantedCropsService = new PlantedCropsService()
    plantedCropsController = new PlantedCropsController(plantedCropsService)
  })

  describe('index', () => {
    it('should return an array of PlantedCrops objects', async () => {
      const result = await plantedCropsController.index()
      expect(Array.isArray(result)).to.be.true
      expect(result.length).to.be.greaterThan(0)
      expect(result[0]).to.have.property('id')
      expect(result[0]).to.have.property('name')
    })
  })
})

import ProducerService from '#services/producer_service'
import { expect } from 'chai'
import { beforeEach, describe, it } from 'node:test'
import ProducerController from '../../app/controllers/producer_controller.js'

describe('ProducerController', () => {
  let producerController: ProducerController
  let producerService: ProducerService

  beforeEach(() => {
    producerService = new ProducerService()
    producerController = new ProducerController(producerService)
  })

  describe('index', () => {
    it('should return a list of all producers', async () => {
      const result = await producerController.index()
      expect(Array.isArray(result)).to.be.true
      expect(result.length).to.be.greaterThan(0)
      expect(result[0]).to.have.property('id')
      expect(result[0]).to.have.property('document')
      expect(result[0]).to.have.property('producerName')
      expect(result[0]).to.have.property('farmName')
      expect(result[0]).to.have.property('totalArea')
      expect(result[0]).to.have.property('arableArea')
      expect(result[0]).to.have.property('vegetationArea')
      expect(result[0]).to.have.property('locationCityId')
      expect(result[0]).to.have.property('locationStateId')
      expect(result[0]).to.have.property('plantedCrops')
    })
  })

  describe('store', () => {
    it('should create a new producer', async () => {
      const ctx: any = {
        request: {
          all: () => ({
            payload: {
              document: '26896644000101',
              producerName: 'João da Silva',
              farmName: 'Fazenda Esperança',
              totalArea: 100,
              arableArea: 80,
              vegetationArea: 30,
              locationCityId: 1,
              locationStateId: 1,
              plantedCrops: [1, 2],
            },
          }),
        },
      }

      const result = await producerController.store(ctx)
      expect(result).to.not.be.null
    })
  })

  describe('show', () => {
    describe('show', () => {
      it('should return a specific producer', async () => {
        const ctx: any = {
          request: {
            param: (paramName: string) => {
              if (paramName === 'id') {
                return '123'
              }
            },
          },
        }

        const result = await producerController.show(ctx)
        expect(result).to.not.be.null
      })
    })

    describe('update', () => {
      it('should update a specific producer', async () => {
        const ctx: any = {
          request: {
            param: (paramName: string) => {
              if (paramName === 'id') {
                return '123'
              }
            },
            all: () => ({
              /* payload data */
            }),
          },
        }

        const result = await producerController.update(ctx)
        expect(result).to.not.be.null
      })
    })

    describe('destroy', () => {
      it('should delete a specific producer', async () => {
        const ctx: any = {
          request: {
            param: (paramName: string) => {
              if (paramName === 'id') {
                return '123'
              }
            },
          },
        }

        const result = await producerController.destroy(ctx)
        expect(result).to.not.be.null
      })
    })

    describe('search', () => {
      it('should search for producers based on specific criteria', async () => {
        const ctx: any = {
          request: {
            all: () => ({
              page: 1,
              limit: 10,
            }),
          },
        }

        const result = await producerController.search(ctx)
        expect(result).to.not.be.null
      })
    })

    describe('findGroupByCrop', () => {
      it('should return a list of producers growing the specified crop', async () => {
        const result = await producerController.findGroupByCrop()
        expect(result).to.not.be.null
      })
    })

    describe('totalFarmsInquantity', () => {
      it('should return the total number of farms and their quantity', async () => {
        const result = await producerController.totalFarmsInquantity()
        expect(result).to.not.be.null
      })
    })

    describe('totalFarmsTnTotalArea', () => {
      it('should return the total number of farms and their total area in tons', async () => {
        const result = await producerController.totalFarmsTnTotalArea()
        expect(result).to.not.be.null
      })
    })

    describe('totalFarmsByArableAreaAndVegetationArea', () => {
      it('should return the total number of farms by arable area and vegetation area', async () => {
        const result = await producerController.totalFarmsByArableAreaAndVegetationArea()
        expect(result).to.not.be.null
        expect(result).to.not.be.null
        expect(result).to.not.be.null
      })
    })

    describe('totalFarmsByLocationState', () => {
      it('should return the total number of farms by location state', async () => {
        const result = await producerController.totalFarmsByLocationState()
        expect(result).to.not.be.null
      })
    })
  })
})

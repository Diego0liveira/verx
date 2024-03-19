import db from '@adonisjs/lucid/services/db'
import { test } from '@japa/runner'
import { expect } from 'chai'
import ProducerService from '../../app/services/producer_service.js'

test.group('ProducerService', (group) => {
  let producerService: ProducerService

  group.tap((testTag) => testTag.tags(['@producer_service']))

  group.each.setup(async () => {
    producerService = new ProducerService()
    await db.beginGlobalTransaction()
    return () => db.rollbackGlobalTransaction()
  })

  test('index - should return an array of producers', async ({ assert }) => {
    const result = await producerService.index()
    assert.isArray(result)
    assert.isNotEmpty(result)
  })

  test('show - should return a specific producer by ID', async ({ assert }) => {
    const producerId = 1
    const result = await producerService.show(producerId)
    assert.exists(result.id)
    assert.equal(Number(result.id), producerId)
  })

  test('show - should throw an exception if the producer is not found', async ({ assert }) => {
    const producerId = 99999999
    try {
      await producerService.show(producerId)
      assert.fail('Expected an exception to be thrown')
    } catch (error) {
      expect(error).to.have.property('message', 'Not found')
    }
  })

  test('update - should update a specific producer by ID', async ({ assert }) => {
    const producerId = 1
    const payload = {
      document: '26896644000101',
      producerName: 'João da Silva',
      farmName: 'Fazenda Esperança',
      totalArea: 100,
      arableArea: 80,
      vegetationArea: 30,
      locationCityId: 1,
    }

    const result = await producerService.update(payload, producerId)
    assert.exists(result.id)
    assert.equal(Number(result.document), payload.document)
    assert.equal(result.producerName, payload.producerName)
    assert.equal(result.farmName, payload.farmName)
    assert.equal(result.totalArea, payload.totalArea)
    assert.equal(result.arableArea, payload.arableArea)
    assert.equal(result.vegetationArea, payload.vegetationArea)
    assert.equal(result.locationCityId, payload.locationCityId)
  })

  test('update - should throw an exception if the producer is not found', async ({ assert }) => {
    const producerId = 999999999999
    const payload = {
      document: '26896644000101',
      producerName: 'João da Silva',
      farmName: 'Fazenda Esperança',
      totalArea: 100,
      arableArea: 80,
      vegetationArea: 30,
      locationCityId: 1,
    }

    try {
      await producerService.update(payload, producerId)
      assert.fail('Expected an exception to be thrown')
    } catch (error) {
      expect(error).to.have.property('message', 'Not found')
    }
  })

  test('destroy - should delete a specific producer by ID', async ({ assert }) => {
    const producerId = 1
    const result = await producerService.destroy(producerId)
    assert.isUndefined(result)
  })

  test('destroy - should throw an exception if the producer is not found', async ({ assert }) => {
    const producerId = 999999999999
    try {
      await producerService.destroy(producerId)
      assert.fail('Expected an exception to be thrown')
    } catch (error) {
      expect(error).to.have.property('message', 'Not found')
    }
  })

  test('store - should create a new producer', async ({ assert }) => {
    const payload = {
      document: '26896644000101',
      producerName: 'João da Silva',
      farmName: 'Fazenda Esperança',
      totalArea: 100,
      arableArea: 80,
      vegetationArea: 30,
      locationCityId: 1,
    }

    const result = await producerService.store(payload)
    assert.exists(result.id)
    assert.equal(Number(result.document), payload.document)
    assert.equal(result.producerName, payload.producerName)
    assert.equal(result.farmName, payload.farmName)
    assert.equal(result.totalArea, payload.totalArea)
    assert.equal(result.arableArea, payload.arableArea)
    assert.equal(result.vegetationArea, payload.vegetationArea)
    assert.equal(result.locationCityId, payload.locationCityId)
  })

  test('search - should return a paginated list of producers based on filters', async ({
    assert,
  }) => {
    const filters = {
      page: 1,
      limit: 10,
    }
    const result = await producerService.search(filters)
    assert.exists(result.currentPage)
    assert.exists(result.total)
  })

  test('findGroupByCrop - should return the total number of farms grouped by crop', async ({
    assert,
  }) => {
    const result = await producerService.findGroupByCrop()
    assert.isNotNull(result)
    assert.isNotEmpty(result)
  })

  test('totalFarmsInquantity - should return the total number of farms', async ({ assert }) => {
    const result = await producerService.totalFarmsInquantity()
    assert.isNotNull(result)
    assert.isNotEmpty(result)
  })

  test('totalFarmsTnTotalArea - should return the total area of all farms', async ({ assert }) => {
    const result = await producerService.totalFarmsTnTotalArea()
    assert.isNotNull(result)
    assert.isNotEmpty(result)
  })

  test('totalFarmsByArableAreaAndVegetationArea - should return the total arable area and vegetation area of all farms', async ({
    assert,
  }) => {
    const result = await producerService.totalFarmsByArableAreaAndVegetationArea()
    assert.isNotNull(result)
    assert.isNotEmpty(result)
  })

  test('totalFarmsByLocationState - should return the total number of farms grouped by location state', async ({
    assert,
  }) => {
    const result = await producerService.totalFarmsByLocationState()
    assert.isNotNull(result)
    assert.isNotEmpty(result)
  })
})

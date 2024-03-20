import db from '@adonisjs/lucid/services/db'
import { test } from '@japa/runner'

test.group('ProducerController', (group) => {
  group.tap((testTag) => testTag.tags(['@location_city_controller']))

  group.each.setup(async () => {
    await db.beginGlobalTransaction()
    return () => db.rollbackGlobalTransaction()
  })

  test('index - should return a list of all producers', async ({ client, assert }) => {
    const result = await client.get('/producer')

    result.assertStatus(200)

    const body = result.body()

    assert.isArray(body)
    assert.isNotEmpty(body)
    assert.exists(body[0].id)
    assert.exists(body[0].document)
    assert.exists(body[0].producerName)
    assert.exists(body[0].farmName)
    assert.exists(body[0].totalArea)
    assert.exists(body[0].arableArea)
    assert.exists(body[0].vegetationArea)
    assert.exists(body[0].locationCityId)
    assert.exists(body[0].locationCity)
    assert.isObject(body[0].locationCity)
    assert.exists(body[0].plantedCrops)
    assert.isArray(body[0].plantedCrops)
  })

  test('store - should create a new producer', async ({ client, assert }) => {
    const payload = {
      document: '26896644000101',
      producerName: 'João da Silva',
      farmName: 'Fazenda Esperança',
      totalArea: 100,
      arableArea: 80,
      vegetationArea: 20,
      locationCityId: 1,
      plantedCrops: [1, 2],
    }

    const result = await client.post('/producer').json(payload)

    result.assertStatus(200)

    const body = result.body()

    assert.isNotNull(body)
    assert.exists(body.id)
    assert.equal(body.document, payload.document)
    assert.equal(body.producerName, payload.producerName)
    assert.equal(body.farmName, payload.farmName)
    assert.equal(body.totalArea, payload.totalArea)
    assert.equal(body.arableArea, payload.arableArea)
    assert.equal(body.vegetationArea, payload.vegetationArea)
    assert.equal(body.locationCityId, payload.locationCityId)
  })

  test('show - should return a specific producer', async ({ client, assert }) => {
    const producerId = 1

    const result = await client.get(`/producer/${producerId}`)

    result.assertStatus(200)

    const body = result.body()

    assert.isNotNull(body)
    assert.exists(body.id)
    assert.exists(body.document)
    assert.exists(body.producerName)
    assert.exists(body.farmName)
    assert.exists(body.totalArea)
    assert.exists(body.arableArea)
    assert.exists(body.vegetationArea)
    assert.exists(body.locationCityId)
    assert.exists(body.locationCity)
    assert.isObject(body.locationCity)
    assert.exists(body.plantedCrops)
    assert.isArray(body.plantedCrops)
  })

  test('update - should update a specific producer', async ({ client, assert }) => {
    const producerId = 1

    const payload = {
      document: '26896644000101',
      producerName: 'João da Silva',
      farmName: 'Fazenda Esperança',
      totalArea: 100,
      arableArea: 80,
      vegetationArea: 20,
      locationCityId: 1,
      plantedCrops: [1, 2],
    }

    const result = await client.put(`/producer/${producerId}`).json(payload)

    result.assertStatus(200)

    const body = result.body()

    assert.isNotNull(body)
    assert.exists(body.id)
    assert.equal(body.id, producerId)
    assert.exists(body.document)
    assert.exists(body.producerName)
    assert.exists(body.farmName)
    assert.exists(body.totalArea)
    assert.exists(body.arableArea)
    assert.exists(body.vegetationArea)
    assert.exists(body.locationCityId)
  })
  /*
  test('update - must try to update a specific producer which does not exist', async ({
    client,
  }) => {
    const producerId = 9999999999

    const payload = {
      document: '26896644000101',
      producerName: 'João da Silva',
      farmName: 'Fazenda Esperança Editado',
      totalArea: 100,
      arableArea: 50,
      vegetationArea: 10,
      locationCityId: 1,
      plantedCrops: [1, 2],
    }

    const result = await client.put(`/producer/${producerId}`).json(payload)

    result.assertStatus(404)
  })
*/
  test('search - should search for producers based on specific criteria', async ({
    client,
    assert,
  }) => {
    const filters = {
      locationCityId: 1,
      plantedCrops: [1, 2],
    }

    const result = await client.post('/producer/search').json(filters)

    result.assertStatus(200)

    const body = result.body()

    assert.exists(body.meta)
    assert.exists(body.data)
    assert.isArray(body.data)
    assert.isNotEmpty(body.data)
  })

  test('destroy - should delete a specific producer', async ({ client }) => {
    const producerId = 1
    const result = await client.delete(`/producer/${producerId}`)
    result.assertStatus(200)
  })
  /*
  test('destroy - must try to delete a specific producer which does not exist', async ({
    client,
    assert,
  }) => {
    const producerId = 9999999999
    await client.delete(`/producer/${producerId}`)
    assert.fail('Expected an exception to be thrown')
  })
  */

  test('findGroupByCrop - should return a list of producers growing the specified crop', async ({
    client,
    assert,
  }) => {
    const result = await client.get('/producer/farms-area-culture')

    result.assertStatus(200)
    const body = result.body()

    assert.isArray(body)
    assert.isNotEmpty(body)
    assert.exists(body[0].planted_crops_id)
    assert.exists(body[0].name)
    assert.exists(body[0].total)
  })

  test('totalFarmsInquantity - should return the total number of farms and their quantity', async ({
    client,
    assert,
  }) => {
    const result = await client.get('/producer/farms-quantity')
    result.assertStatus(200)
    const body = result.body()
    assert.exists(body.total_farms)
  })

  test('totalFarmsTnTotalArea - should return the total number of farms and their total area in tons', async ({
    client,
    assert,
  }) => {
    const result = await client.get('/producer/farms-area')
    result.assertStatus(200)
    const body = result.body()
    assert.isArray(body)
    assert.isNotEmpty(body)
    assert.exists(body[0].total_area)
  })

  test('totalFarmsByArableAreaAndVegetationArea - should return the total number of farms by arable area and vegetation area', async ({
    client,
    assert,
  }) => {
    const result = await client.get('/producer/farms-area-use')

    result.assertStatus(200)
    const body = result.body()
    assert.isArray(body)
    assert.isNotEmpty(body)
    assert.exists(body[0].arable_area)
    assert.exists(body[0].vegetation_area)
  })

  test('totalFarmsByLocationState - should return the total number of farms by location state', async ({
    client,
    assert,
  }) => {
    const result = await client.get('/producer/farms-state')
    result.assertStatus(200)
    const body = result.body()
    assert.isArray(body)
    assert.isNotEmpty(body)
    assert.exists(body[0].location_state_id)
    assert.exists(body[0].full_name)
    assert.exists(body[0].count)
  })
})

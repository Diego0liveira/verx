import LocationCityService from '#services/location_city_service'
import db from '@adonisjs/lucid/services/db'
import { test } from '@japa/runner'

test.group('LocationCityService', (group) => {
  let locationCityService: LocationCityService

  group.tap((testTag) => testTag.tags(['@location_city_service']))

  group.each.setup(async () => {
    locationCityService = new LocationCityService()
    await db.beginGlobalTransaction()
    return () => db.rollbackGlobalTransaction()
  })

  test('index - should return an array of LocationCity objects', async ({ assert }) => {
    const result = await locationCityService.index()
    assert.isArray(result)
    assert.isNotEmpty(result)
  })

  test('findAllByStateId - should return an array of LocationCity objects filtered by state ID', async ({
    assert,
  }) => {
    const stateId = 1
    const result = await locationCityService.findAllByStateId(stateId)
    assert.isArray(result)
    assert.isNotEmpty(result)
    assert.equal(Number(result[0].locationStateId), stateId)
  })

  test('findAllByStateId -should return an empty array if no LocationCity objects are found for the given state ID', async ({
    assert,
  }) => {
    const stateId = 9999999999
    const result = await locationCityService.findAllByStateId(stateId)
    assert.isArray(result)
    assert.isEmpty(result)
  })
})

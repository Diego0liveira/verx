import LocationCity from '#models/location_city'
import { test } from '@japa/runner'

test.group('LocationCitiesController', () => {
  test('index - should return an array of LocationCity objects', async ({ client }) => {
    const result = await client.get('/location-cities')
    result.assertStatus(200)
  })

  test('show - should return an array of LocationCity objects filtered by state ID', async ({
    client,
    assert,
  }) => {
    const stateId = 1

    const result = await client.get(`/location-cities/${stateId}`)
    result.assertStatus(200)
    result.assertBodyContains('locationStateId')
    assert.equal(+(result.body as unknown as Array<LocationCity>)[0].locationStateId, stateId)
  })
})

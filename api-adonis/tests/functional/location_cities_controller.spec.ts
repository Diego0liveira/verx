import db from '@adonisjs/lucid/services/db'
import { test } from '@japa/runner'

test.group('LocationCitiesController', (group) => {
  group.tap((testTag) => testTag.tags(['@location_city_controller']))

  group.each.setup(async () => {
    await db.beginGlobalTransaction()
    return () => db.rollbackGlobalTransaction()
  })
  test('index - should return an array of LocationCity objects', async ({ client, assert }) => {
    const result = await client.get('/location-city')

    const body = result.body()

    result.assertStatus(200)
    assert.isArray(body)
    assert.isNotEmpty(body)
  })

  test('show - should return an array of LocationCity objects filtered by state ID', async ({
    client,
    assert,
  }) => {
    const stateId = 1

    const result = await client.get(`/location-city/${stateId}`)

    result.assertStatus(200)

    const body = result.body()
    assert.isArray(body)
    assert.isNotEmpty(body)
    assert.equal(body[0].locationStateId, stateId)
  })

  test('show - should return an empty array if no LocationCity objects are found for the given state ID', async ({
    client,
    assert,
  }) => {
    const stateId = 9999999999

    const result = await client.get(`/location-city/${stateId}`)

    result.assertStatus(200)

    const body = result.body()
    assert.isArray(body)
    assert.isEmpty(body)
  })
})

import db from '@adonisjs/lucid/services/db'
import { test } from '@japa/runner'

test.group('PlantedCropsController', (group) => {
  group.tap((testTag) => testTag.tags(['@planted-crops_controller']))

  group.each.setup(async () => {
    await db.beginGlobalTransaction()
    return () => db.rollbackGlobalTransaction()
  })

  test('index - should return an array of PlantedCrops objects', async ({ client, assert }) => {
    const result = await client.get(`/planted-crops`)

    result.assertStatus(200)

    const body = result.body()

    assert.isArray(body)
    assert.isNotEmpty(body)
  })
})

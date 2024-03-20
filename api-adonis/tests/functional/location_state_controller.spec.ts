import db from '@adonisjs/lucid/services/db'
import { test } from '@japa/runner'

test.group('LocationStateController', (group) => {
  group.tap((testTag) => testTag.tags(['@location_state_controller']))

  group.each.setup(async () => {
    await db.beginGlobalTransaction()
    return () => db.rollbackGlobalTransaction()
  })
  test('index - should return an array of LocationState objects', async ({ client, assert }) => {
    const result = await client.get('/location-state')

    result.assertStatus(200)

    const body = result.body()

    assert.isArray(body)
    assert.isNotEmpty(body)
  })
})

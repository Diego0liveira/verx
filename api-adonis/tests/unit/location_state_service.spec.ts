import { test } from '@japa/runner'

import db from '@adonisjs/lucid/services/db'
import LocationStateService from '../../app/services/location_state_service.js'

test.group('LocationStateService', (group) => {
  let locationStateService: LocationStateService

  group.tap((testTag) => testTag.tags(['@location_state_service']))

  group.each.setup(async () => {
    locationStateService = new LocationStateService()
    await db.beginGlobalTransaction()
    return () => db.rollbackGlobalTransaction()
  })

  test('index - should return an array of LocationState objects', async ({ assert }) => {
    const result = await locationStateService.index()
    assert.isTrue(Array.isArray(result))
    assert.isNotEmpty(result)
  })
})

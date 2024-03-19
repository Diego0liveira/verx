import db from '@adonisjs/lucid/services/db'
import { test } from '@japa/runner'
import PlantedCropsService from '../../app/services/planted_crops_service.js'

test.group('PlantedCropsService', (group) => {
  let plantedCropsService: PlantedCropsService

  group.tap((testTag) => testTag.tags(['@planted_crops_service']))

  group.each.setup(async () => {
    plantedCropsService = new PlantedCropsService()
    await db.beginGlobalTransaction()
    return () => db.rollbackGlobalTransaction()
  })

  test('index - should return an array of planted crops', async ({ assert }) => {
    const result = await plantedCropsService.index()
    assert.isTrue(Array.isArray(result))
    assert.isNotEmpty(result)
  })
})

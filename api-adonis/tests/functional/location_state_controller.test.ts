import LocationStateService from '#services/location_state_service'
import { expect } from 'chai'
import { beforeEach, describe, it } from 'node:test'
import LocationStateController from '../../app/controllers/location_state_controller.js'

describe('LocationStateController', () => {
  let locationStateController: LocationStateController
  let locationStateService: LocationStateService

  beforeEach(() => {
    locationStateService = new LocationStateService()
    locationStateController = new LocationStateController(locationStateService)
  })

  describe('index', () => {
    it('should return an array of LocationState objects', async () => {
      const result = await locationStateController.index()
      expect(Array.isArray(result)).to.be.true
      expect(result.length).to.be.greaterThan(0)
      expect(result[0]).to.have.property('id')
      expect(result[0]).to.have.property('name')
    })
  })
})

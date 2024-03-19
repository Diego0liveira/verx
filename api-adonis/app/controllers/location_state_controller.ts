import LocationState from '#models/location_state'
import LocationStateService from '#services/location_state_service'
import { inject } from '@adonisjs/core'

@inject()
export default class LocationStateController {
  constructor(private locationStateService: LocationStateService) {}
  /**
   * Retrieves all location states.
   *
   * @returns A promise that resolves to an array of LocationState objects.
   */
  async index(): Promise<LocationState[]> {
    return this.locationStateService.index()
  }
}

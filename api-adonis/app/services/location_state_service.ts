import LocationState from '#models/location_state'
import { inject } from '@adonisjs/core'

@inject()
export default class LocationStateService {
  /**
   * Retrieves all location states.
   * @returns A promise that resolves to an array of LocationState objects.
   */
  async index(): Promise<LocationState[]> {
    return LocationState.all()
  }
}

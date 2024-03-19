import LocationCity from '#models/location_city'
import { inject } from '@adonisjs/core'

@inject()
export default class LocationCityService {
  /**
   * Get all location cities.
   * @returns {Promise<LocationCity[]>} A promise that resolves to an array of LocationCity objects.
   */
  async index(): Promise<LocationCity[]> {
    return LocationCity.all()
  }

  /**
   * Find all location cities by state ID.
   * @param {number} stateId - The ID of the state.
   * @returns {Promise<LocationCity[]>} A promise that resolves to an array of LocationCity objects.
   */
  async findAllByStateId(stateId: number): Promise<LocationCity[]> {
    return LocationCity.query().where('location_state_id', stateId).preload('locationState')
  }
}

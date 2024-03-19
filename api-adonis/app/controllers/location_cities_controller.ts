import type { HttpContext } from '@adonisjs/core/http'

import LocationCity from '#models/location_city'
import LocationCityService from '#services/location_city_service'
import { inject } from '@adonisjs/core'
/**
 * Controller class for managing location cities.
 */
@inject()
export default class LocationCitiesController {
  constructor(private locationCityService: LocationCityService) {}

  /**
   * Retrieves all location cities.
   * @returns A promise that resolves to an array of LocationCity objects.
   */
  async index(): Promise<LocationCity[]> {
    return this.locationCityService.index()
  }

  /**
   * Retrieves location cities by state ID.
   * @param params - The HTTP context parameters.
   * @returns A promise that resolves to an array of LocationCity objects.
   */
  async show({ params }: HttpContext): Promise<LocationCity[]> {
    return this.locationCityService.findAllByStateId(params.id)
  }
}

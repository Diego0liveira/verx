import LocationState from '#models/location_state'
import type { HttpContext } from '@adonisjs/core/http'

export default class LocationStateController {
  async index(ctx: HttpContext) {
    return LocationState.all()
  }
}

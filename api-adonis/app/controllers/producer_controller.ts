import ProducerService from '#services/producer_service'
import { updatePostValidator } from '#validators/producer'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * Controller class for handling producer-related operations.
 */
export default class ProducerController {
  constructor(private producerServicer: ProducerService) {}

  /**
   * Get all producers.
   * @param ctx The HTTP context.
   * @returns A promise that resolves to the list of all producers.
   */
  async index(ctx: HttpContext) {
    return this.producerServicer.all()
  }

  /**
   * Store a new producer.
   * @param ctx The HTTP context.
   * @returns A promise that resolves to the newly created producer.
   */
  async store(ctx: HttpContext) {
    return this.producerServicer.store(ctx)
  }

  /**
   * Get a specific producer by ID.
   * @param ctx The HTTP context.
   * @returns A promise that resolves to the specified producer.
   */
  async show(ctx: HttpContext) {
    return this.producerServicer.show(ctx)
  }

  /**
   * Update a specific producer.
   * @param ctx The HTTP context.
   * @returns A promise that resolves to the updated producer.
   */
  async update(ctx: HttpContext) {
    const payload = ctx.request.all()
    await updatePostValidator.validate(payload)
    return this.producerServicer.update(ctx)
  }

  /**
   * Delete a specific producer.
   * @param ctx The HTTP context.
   * @returns A promise that resolves when the producer is deleted.
   */
  async destroy(ctx: HttpContext) {
    return this.producerServicer.destroy(ctx)
  }

  /**
   * Search for producers based on specific criteria.
   * @param ctx The HTTP context.
   * @returns A promise that resolves to the list of matching producers.
   */
  async search(ctx: HttpContext) {
    return this.producerServicer.search(ctx)
  }

  /**
   * Search for producers by crop.
   * @param ctx The HTTP context.
   * @returns A promise that resolves to the list of producers growing the specified crop.
   */
  async searchByCrop(ctx: HttpContext) {
    return this.producerServicer.searchByCrop(ctx)
  }

  /**
   * Get the total number of farms and their quantity.
   * @param ctx The HTTP context.
   * @returns A promise that resolves to the total number of farms and their quantity.
   */
  async totalFarmsInquantity(ctx: HttpContext) {
    return this.producerServicer.totalFarmsInquantity()
  }

  /**
   * Get the total number of farms and their total area in tons.
   * @param ctx The HTTP context.
   * @returns A promise that resolves to the total number of farms and their total area in tons.
   */
  async totalFarmsTnTotalArea(ctx: HttpContext) {
    return this.producerServicer.totalFarmsTnTotalArea()
  }

  /**
   * Get the total number of farms by arable area and vegetation area.
   * @param ctx The HTTP context.
   * @returns A promise that resolves to the total number of farms by arable area and vegetation area.
   */
  async totalFarmsByArableAreaAndVegetationArea(ctx: HttpContext) {
    return this.producerServicer.totalFarmsByArableAreaAndVegetationArea()
  }

  /**
   * Get the total number of farms by location state.
   * @param ctx The HTTP context.
   * @returns A promise that resolves to the total number of farms by location state.
   */
  async totalFarmsByLocationState(ctx: HttpContext) {
    return this.producerServicer.totalFarmsByLocationState()
  }

  /**
   * Get the total number of farms by location city.
   * @param ctx The HTTP context.
   * @returns A promise that resolves to the total number of farms by location city.
   */
  async totalFarmsByLocationCity(ctx: HttpContext) {
    return this.producerServicer.totalFarmsByLocationCity()
  }
}

import ProducerService from '#services/producer_service'
import { createOrUpdatePostValidator } from '#validators/producer'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ProducerController {
  constructor(private producerServicer: ProducerService) {}

  /**
   * Get all producers.
   * @returns A promise that resolves to the list of all producers.
   */
  async index() {
    return this.producerServicer.index()
  }

  /**
   * Store a new producer.
   * @param ctx The HTTP context.
   * @returns A promise that resolves to the newly created producer.
   */
  async store(ctx: HttpContext) {
    const payload = ctx.request.all()
    await createOrUpdatePostValidator.validate(payload)
    ctx.response.status(201)
    return this.producerServicer.store(payload)
  }

  /**
   * Get a specific producer by ID.
   * @param ctx The HTTP context.
   * @returns A promise that resolves to the specified producer.
   */
  async show(ctx: HttpContext) {
    return this.producerServicer.show(ctx.request.param('id'))
  }

  /**
   * Update a specific producer.
   * @param ctx The HTTP context.
   * @returns A promise that resolves to the updated producer.
   */
  async update(ctx: HttpContext) {
    const payload = ctx.request.all()
    await createOrUpdatePostValidator.validate(payload)
    return await this.producerServicer.update(payload, ctx.request.param('id'))
  }

  /**
   * Delete a specific producer.
   * @param ctx The HTTP context.
   * @returns A promise that resolves when the producer is deleted.
   */
  async destroy(ctx: HttpContext) {
    let result
    try {
      result = await this.producerServicer.destroy(ctx.request.param('id'))
      ctx.response.status(204)
      return result
    } catch (error) {
      return ctx.response.status(404).send('Producer not found')
    }
  }

  /**
   * Search for producers based on specific criteria.
   * @param ctx The HTTP context.
   * @returns A promise that resolves to the list of matching producers.
   */
  async search(ctx: HttpContext) {
    const filters = ctx.request.all()

    return this.producerServicer.search(filters)
  }

  /**
   * Search for producers by crop.
   * @returns A promise that resolves to the list of producers growing the specified crop.
   */
  async findGroupByCrop() {
    return this.producerServicer.findGroupByCrop()
  }

  /**
   * Get the total number of farms and their quantity.
   * @returns A promise that resolves to the total number of farms and their quantity.
   */
  async totalFarmsInquantity() {
    return this.producerServicer.totalFarmsInquantity()
  }

  /**
   * Get the total number of farms and their total area in tons.
   * @returns A promise that resolves to the total number of farms and their total area in tons.
   */
  async totalFarmsTnTotalArea() {
    return this.producerServicer.totalFarmsTnTotalArea()
  }

  /**
   * Get the total number of farms by arable area and vegetation area.
   * @returns A promise that resolves to the total number of farms by arable area and vegetation area.
   */
  async totalFarmsByArableAreaAndVegetationArea() {
    return this.producerServicer.totalFarmsByArableAreaAndVegetationArea()
  }

  /**
   * Get the total number of farms by location state.
   * @returns A promise that resolves to the total number of farms by location state.
   */
  async totalFarmsByLocationState() {
    return this.producerServicer.totalFarmsByLocationState()
  }
}

import NotFoundException from '#exceptions/not_found_exception'
import Producer from '#models/producer'
import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'
import { SimplePaginatorContract } from '@adonisjs/lucid/types/querybuilder'

@inject()
export default class ProducerService {
  /**
   * Get all producers.
   */
  async index() {
    const producers = await Producer.all()
    for (const producer of producers) {
      await producer.load('plantedCrops')
      await producer.load('locationCity', (query) => {
        query.preload('locationState')
      })
    }

    return producers
  }

  /**
   * Get a specific producer by ID.
   * @param id - The ID of the producer.
   * @returns The producer object.
   * @throws NotFoundException if the producer is not found.
   */
  async show(id: number): Promise<any> {
    const producer = await Producer.find(id)

    if (!producer) {
      throw new NotFoundException('Producer not found')
    }

    await producer.load('plantedCrops')
    await producer.load('locationCity', (query) => {
      query.preload('locationState')
    })

    return producer
  }

  /**
   * Delete a producer by ID.
   * @param id - The ID of the producer.
   * @throws NotFoundException if the producer is not found.
   */
  async destroy(id: number) {
    const producer = await Producer.find(id)

    if (!producer) {
      throw new NotFoundException('Producer not found')
    }

    await producer.delete()
  }

  /**
   * Create a new producer.
   * @param payload - The data for the new producer.
   * @returns The created producer object.
   */
  async store(payload: Partial<Producer>): Promise<Producer> {
    return Producer.create(payload)
  }

  /**
   * Update a producer by ID.
   * @param payload - The updated data for the producer.
   * @param id - The ID of the producer.
   * @returns The updated producer object.
   * @throws NotFoundException if the producer is not found.
   */
  async update(payload: Partial<Producer>, id: number): Promise<Producer> {
    const producer = await Producer.find(id)

    if (!producer) {
      throw new NotFoundException('Producer not found')
    }

    producer.merge(payload)
    await producer.save()

    return producer
  }

  /**
   * Search for producers based on filters.
   * @param filters - The filters to apply to the search.
   * @returns A paginated list of producers.
   */
  async search(filters: any): Promise<SimplePaginatorContract<Producer[]>> {
    const {
      page,
      limit,
      plantedCrops,
      initialDate,
      finalDate,
      producerName,
      farmName,
      locationCities,
    } = filters

    const query = db.from('producers')

    if (producerName) {
      query.where('producer_name', 'ilike', `%${producerName}%`)
    }

    if (farmName) {
      query.where('farm_name', 'ilike', `%${farmName}%`)
    }

    if (locationCities && locationCities.length > 0) {
      query.whereIn('location_city_id', locationCities)
    }

    if (plantedCrops && plantedCrops.length > 0) {
      query
        .join('planted_crops_producer', 'producers.id', 'planted_crops_producer.producer_id')
        .join('planted_crops', 'planted_crops_producer.planted_crops_id', 'planted_crops.id')
        .whereIn('planted_crops.id', plantedCrops)
        .select('producers.*')
    }

    if (initialDate && finalDate) {
      query.whereBetween('created_at', [initialDate, finalDate])
    }

    return query.paginate(page, limit)
  }

  /**
   * Get the total number of farms grouped by crop.
   * @returns The total number of farms grouped by crop.
   */
  async findGroupByCrop(): Promise<any> {
    return db
      .from('producers')
      .join('planted_crops_producer', 'producers.id', 'planted_crops_producer.producer_id')
      .join('planted_crops', 'planted_crops_producer.planted_crops_id', 'planted_crops.id')
      .groupBy('planted_crops_producer.planted_crops_id', 'planted_crops.name')
      .select(
        'planted_crops_producer.planted_crops_id',
        'planted_crops.name',
        db.raw('count(planted_crops_producer.planted_crops_id) as total')
      )
  }

  /**
   * Get the total number of farms.
   * @returns The total number of farms.
   */
  async totalFarmsInquantity(): Promise<any> {
    const result = await db.from('producers').count('id as total_farms')
    return result[0]
  }

  /**
   * Get the total area of all farms.
   * @returns The total area of all farms.
   */
  async totalFarmsTnTotalArea() {
    const result = await db.from('producers').sum('total_area as total_area')
    return result[0]
  }

  /**
   * Get the total arable area and vegetation area of all farms.
   * @returns The total arable area and vegetation area of all farms.
   */
  async totalFarmsByArableAreaAndVegetationArea(): Promise<any> {
    const result = await db
      .from('producers')
      .select(
        db.raw('sum(arable_area) as arable_area'),
        db.raw('sum(vegetation_area) as vegetation_area')
      )

    return result[0]
  }

  /**
   * Get the total number of farms grouped by location state.
   * @returns The total number of farms grouped by location state.
   */
  async totalFarmsByLocationState(): Promise<any> {
    return db
      .from('producers')
      .join('location_cities', 'producers.location_city_id', 'location_cities.id')
      .join('location_states', 'location_cities.location_state_id', 'location_states.id')
      .select('location_state_id', 'location_states.full_name')
      .count('producers.id')
      .groupBy('location_state_id', 'location_states.full_name')
  }
}

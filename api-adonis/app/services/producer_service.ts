import Producer from '#models/producer'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ProducerService {
  async all() {
    return Producer.all()
  }

  async index({ request }: HttpContext) {
    const { page, limit } = request.all()

    return Producer.query().paginate(page, limit)
  }

  async show({ params, response }: HttpContext) {
    const producer = await Producer.findOrFail(params.id)

    if (!producer.id) {
      return response.status(404).send({ error: 'Not found' })
    }

    await producer.load('locationState')
    await producer.load('locationCity')
    await producer.load('plantedCrops')

    return producer
  }

  async destroy({ params, response }: HttpContext) {
    const producer = await Producer.findOrFail(params.id)

    if (!producer.id) {
      return response.status(404).send({ error: 'Not found' })
    }

    await producer.delete()
  }

  async store({ request }: { request: any }) {
    const data = request.only(['name', 'email', 'phone', 'location_state_id', 'location_city_id'])
    return Producer.create(data)
  }

  async update({ params, request, response }: HttpContext) {
    const producer = await Producer.findOrFail(params.id)

    if (!producer.id) {
      return response.status(404).send({ error: 'Not found' })
    }

    producer.merge(
      request.only(['name', 'email', 'phone', 'location_state_id', 'location_city_id'])
    )
    await producer.save()

    return producer
  }

  async search({ request }: HttpContext) {
    const { page, limit, name, email, phone, locationStateId, locationCityId } = request.all()

    const query = Producer.query()

    if (name) {
      query.where('name', 'ilike', `%${name}%`)
    }

    if (email) {
      query.where('email', 'ilike', `%${email}%`)
    }

    if (phone) {
      query.where('phone', 'ilike', `%${phone}%`)
    }

    if (locationStateId) {
      query.where('location_state_id', locationStateId)
    }

    if (locationCityId) {
      query.where('location_city_id', locationCityId)
    }

    return query.paginate(page, limit)
  }

  async searchByCrop({ request }: HttpContext) {
    const { page, limit, cropId } = request.all()

    const query = Producer.query()

    query
      .join('producer_crops', 'producers.id', 'producer_crops.producer_id')
      .where('producer_crops.crop_id', cropId)
      .select('producers.*')

    return query.paginate(page, limit)
  }

  async totalFarmsInquantity() {
    return Producer.query().count('id')
  }

  async totalFarmsTnTotalArea() {
    return Producer.query().sum('total_area')
  }

  async totalFarmsByArableAreaAndVegetationArea() {
    return Producer.query().sum('arable_area').sum('vegetation_area')
  }

  async totalFarmsByLocationState() {
    return Producer.query().select('location_state_id').count('id').groupBy('location_state_id')
  }

  async totalFarmsByLocationCity() {
    return Producer.query().select('location_city_id').count('id').groupBy('location_city_id')
  }
}

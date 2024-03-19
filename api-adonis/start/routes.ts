/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const ProducerController = () => import('#controllers/producer_controller')
const LocationStateController = () => import('#controllers/location_state_controller')
const LocationCitiesController = () => import('#controllers/location_cities_controller')
const PlantedCropsController = () => import('#controllers/planted_crops_controller')
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'api Brain Agriculture in execution...',
  }
})

router.get('producer/farms-quantity', [ProducerController, 'totalFarmsInquantity'])
router.get('producer/farms-area', [ProducerController, 'totalFarmsTnTotalArea'])
router.get('producer/farms-state', [ProducerController, 'totalFarmsByLocationState'])
router.get('producer/farms-area-culture', [ProducerController, 'findGroupByCrop'])
router.get('producer/farms-area-use', [
  ProducerController,
  'totalFarmsByArableAreaAndVegetationArea',
])

router.get('producer', [ProducerController, 'index'])
router.post('producer', [ProducerController, 'store'])
router.post('producer/search', [ProducerController, 'search'])
router.put('producer/:id', [ProducerController, 'update'])
router.get('producer/:id', [ProducerController, 'show'])
router.delete('producer/:id', [ProducerController, 'destroy'])

router.get('location-state', [LocationStateController, 'index'])

router.get('location-city', [LocationCitiesController, 'index'])
router.get('location-city/:id', [LocationCitiesController, 'show'])

router.get('planted-crops', [PlantedCropsController, 'index'])

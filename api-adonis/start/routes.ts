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
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('producer', [ProducerController, 'index'])
router.get('location-state', [LocationStateController, 'index'])

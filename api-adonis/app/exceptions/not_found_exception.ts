import { Exception } from '@adonisjs/core/exceptions'

export default class NotFoundException extends Exception {
  static status = 404

  constructor(message: string) {
    super(message, { code: 'E_NOT_FOUND', status: NotFoundException.status })
  }
}

import Log from '@app/monitoring/log'
import * as Errors from '@app/errors'

import { RequestHandler} from 'express'
const log = Log.child({
  reason: 'overlord-only',
  type: 'middleware'
})

export default (): RequestHandler => async (_, res, next) => {
  if (!res.locals.user) {
    log.warn('No user has been authenticated before checking for overlord! Erroring out')

    return next(new Errors.HTTP.NotAuthenticated())
  }

  if (!res.locals.user.is_overlord) {
    log.warn('The user is authenticated but is not the overlord. Erroring out')

    return next(new Errors.HTTP.NotAuthenticated())
  }

  log.trace('Overlord is asking me to do something! Better get to it.')

  return next()
}
import ReqLogger from 'express-pino-logger'
import Log from '@app/monitoring/log'

const log = Log.child({
  reason: 'request'
})

export default () => ReqLogger({
  logger: log
})
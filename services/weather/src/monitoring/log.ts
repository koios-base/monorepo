import Pino from 'pino'

export default Pino({
  level: 'trace',
  serializers: Pino.stdSerializers
})
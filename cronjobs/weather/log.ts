import Pino from 'pino'

export default Pino({
  serializers: Pino.stdSerializers,
  level: 'trace'
})
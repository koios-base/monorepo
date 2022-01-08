import { haredo } from 'haredo'

export const connection = haredo({
  connection: `amqp://${process.env.MQ_URL}`
})
 
export const emit = (data: {[x: string]: unknown}) => connection.queue(process.env.MQ_EXCHANGE!).publish(data)

export const currentWeather = (payload: any) => emit({
  type: 'weather.lifecycle.current',
  payload,
  timestamp: new Date().toISOString()
})

export const starting = () => emit({
  type: 'weather.lifecycle.starting',
  timestamp: new Date().toISOString()
})

export const finished = () => emit({
  type: 'weather.lifecycle.finished',
  timestamp: new Date().toISOString()
})

export const disconnect = () => connection.close()
import Log from './log'
import * as API from './api'
import * as Publish from './publish'

const main = async () => {
  await Publish.starting()
  const weather = await API.getCurrentWeather()
  Log.trace({ weather })
  await Publish.currentWeather(weather as any)
  await Publish.finished()
}

main()
  .then(Publish.disconnect)
  .catch(err => {
    Log.fatal({ err }, 'Something went wrong')
  })
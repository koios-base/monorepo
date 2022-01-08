import Log from './log'
import * as API from './api'
import * as Publish from './publish'

const main = async () => {
  await Publish.currentWeather(await API.getCurrentWeather() as any)
  await new Promise(res => setTimeout(res, 2000))
}

main()
  .then(Publish.disconnect)
  .catch(err => {
    Log.fatal({ err }, 'Something went wrong')
  })
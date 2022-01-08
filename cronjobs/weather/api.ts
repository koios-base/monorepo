import axios from 'axios'

export const getCurrentWeather = (query = 'Knoxville') => axios.get(
  `${process.env.WEATHER_API_URL}/current.json?key=${process.env.WEATHER_API_KEY}&q=${query}&aqi=yes`
).then(response => response.data)

export const getForecastedWeather = (query = 'Knoxville', days = 3) => axios(
  `${process.env.WEATHER_API_URL}/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${query}&days=${days}&aqi=yes&alert=yes`
).then(response => response.data)

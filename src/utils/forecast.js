const request = require('request')

const darksky_api_key = '17bc392097fc334992cb9b494267e0ec'
const darksky_api_url = 'https://api.darksky.net/forecast/' + darksky_api_key + '/'

const forecast = (lat, lng, callback) => {
    const url = darksky_api_url + encodeURIComponent(lat + ',' + lng) + '?units=si&lang=fr'

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('An error occured')
        } else if (body.error) {
            callback('DarkSky Error  : ' + body.error)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature
            })
        }
    })
}

module.exports = forecast
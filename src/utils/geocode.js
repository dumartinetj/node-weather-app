const request = require('request')

const mapbox_api_key = 'pk.eyJ1IjoiZHVtYXJ0aW5ldGoiLCJhIjoiY2s2ZGk0MnRjMDczYjNubXZoMXlwZHAzaCJ9.6reaBSPWIRhzhSJfv1YI0A'
const mapbox_api_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'

const geocode = (location, callback) => {
    const url = mapbox_api_url + encodeURIComponent(location) + '.json?access_token=' + mapbox_api_key + '&language=fr'

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('An error occured')
        } else if (body.error) {
            callback('MapBox Error  : ' + body.error)
        } else {
            if(body.features.length > 0) {
                callback(undefined, {
                    location: body.features[0].place_name,
                    lat: body.features[0].center[1],
                    lng: body.features[0].center[0]
                })
            } else {
                callback('MapBox Error : No location found')
            }
        }
    })
}

module.exports = geocode
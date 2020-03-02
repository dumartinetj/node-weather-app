const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Paths
const publicDirPath = path.join(__dirname, '../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')

// Handlebars Config
app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialsDirPath)

// Express Config
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        pageTitle: 'Julien Dumartinet'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        pageTitle: 'Help page',
        message: 'This is a help message'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        pageTitle: 'Help page not found',
        message: 'This help article does not exists'
    })
})

app.get('/api', (req, res) => {
    res.send({
        json: true,
        name: 'Julien'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(address, (error, { lat, lng, location } = {}) => {
        if(error) {
            return res.send({ error })
        }
    
        forecast(lat, lng, (error, { summary, temperature } = {}) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                location,
                address,
                weather: summary,
                temperature: 'Il fait actuellement : ' + temperature + '°C'
            })
        })
    })

    
})

app.get('*', (req, res) => {
    res.render('404', {
        pageTitle: 'Page not found',
        message: 'Get away bruh'
    })
})

app.listen(port, () => {
    console.log('Server started on port ' + port)
})
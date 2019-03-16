const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Eran Segal'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Webpage',
        name: 'Eran Segal'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Webpage',
        name: 'Eran Segal',
        message: 'Hey there, this is a help page for the new weather website'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a valid address!'
        });
    }
    // {} in the end is used as a default parameter in case no location is present
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error });
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Not Found',
        message: 'Help article not found.',
        name: 'Eran Segal'
    });
});

app.get('*', (req, res) => { //needs to come last after all the previous setups
    res.render('404', {
        title: '404 Not Found',
        message: 'Page not found.',
        name: 'Eran Segal'
    });
});

app.listen(3000, () => {
    console.log('server is up on port 3000.');
});
const request = require('request');

const forecast = (lng, lat, callback) => {
    const url = `https://api.darksky.net/forecast/252c95ce53bb1743356e39eb5b4ad506/${lat},${lng}?units=si`;
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location server!');
        } else if(body.error) {
            callback('Unable to find location');
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain. The temperature high for today is ${body.daily.data[0].temperatureHigh} and the temperature low for today is ${body.daily.data[0].temperatureLow}. Have a nice day!`)
        }
    });
}

module.exports = forecast;
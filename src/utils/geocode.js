const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZXJhbnNlZyIsImEiOiJjanN6NTUwYWExMnpzNDRvZm56OG5mcGFuIn0.MvvK5u-rgsztQxudYy_DQw&limit=1';
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services!', undefined);
        } else if(body.features.length == 0) {
            callback('Unable to find location. Try another search');//if we don't specify the response it returns 'undefined' as default
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;
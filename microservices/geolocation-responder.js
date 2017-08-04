const cote = require('cote');
const request = require('request');
const responder = new cote.Responder({name: 'geolocation responder'});

responder.on('latlng', (req, cb) => { // ideally, you would sanitize your input here.

    let address = req.address;

    console.log("Im in the responder");
    getLatLng(address).then(
        data => {
            cb(null, data);
        }, err => {
            cb(err);
        }
    )
});


let getLatLng = (address) => {

    console.log("I am here");
    return new Promise((resolve, reject) => {
        let options = {
            url: 'https://maps.googleapis.com/maps/api/geocode/json',
            qs: { address: address, key: require('../config/config').GOOGLE_GEOCODE_KEY }
        };

        request(options, (err, response, body) => {
            let data = JSON.parse(body);
            // console.log(data);
            if (data.results.length > 0) {
                let tmpObj = {
                    formattedAddress: data.results[0].formatted_address,
                    lat: data.results[0].geometry.location.lat,
                    lng: data.results[0].geometry.location.lng
                };
                resolve(tmpObj);
            } else {
                let err = {
                    message: data.error_message,
                    status: data.status,
                    statusCode: response.statusCode
                };
                reject(err);
            }
        });
    });
}


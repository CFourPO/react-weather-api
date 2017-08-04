import express from 'express';
const getLatLng = require('./getLatLng');
const darksky = require('./darksky');
const router = express.Router();

const cote = require('cote');
const requester = new cote.Requester({ name: 'geolocation requester' });





let sendGeolocationRequest = (address) => {
    return new Promise((resolve, reject) => {
        const request = { type: 'latlng', address: address };
        requester.send(request, (err, res) => {
            console.log("Im in the request");
            console.log(res);
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

router.post('/darksky', (req, res, next) => {
    sendGeolocationRequest(req.body.address).then(
        data => {
            console.log(data.lat);
            darksky.getForecast(data.lat, data.lng).then(
                mydata => {
                    res.status(200).json({data: mydata});
                }, error => {
                res.status(error.statusCode).json({
                    error: error
                });
            });
    }, error => {
        console.log("Im errored");
        res.status(error.statusCode || 500).json({
            error: error
        });
    });


    // console.log("I'm here");
    // Geolocation.requester.send({
    //     type: 'latlng',
    //     address: req.body.address
    // }, (err, response) => {
    //     if (err) {
    //         console.log("Error: ", err);
    //         req.status(err.statusCode || 500).json({
    //             message: "Error in Geolocation Requester",
    //             err: err
    //         });
    //     } else {
    //         req.body.lat = response.lat;
    //         req.body.lng = response.lng;
    //         req.body.formattedAddress = response.formattedAddress;
    //         darksky.getForecast(req, (err, data) => {
    //             if (err) {
    //                 res.status(err.statusCode).json({
    //                     error: err
    //                 });
    //             } else {
    //                 res.status(200).json({
    //                     data: data
    //                 });
    //             }
    //         });
    //     }
    // });
});

router.post('/hourly', (req, res, next) => {
    darksky.getHourlyForecast(req, (err, data) => {
        if (err) {
            res.status(err.statusCode).json({
                error: err
            });
        } else {
            res.status(200).json({
                data: data
            });
        }
    });
});

router.post('/geocode', (req, res, next) => {
    console.log("I'm here--1");
    getLatLng.getLatLng(req, (err, data) => {
        if (err) {
            console.log(err.message);
            res.status(err.statusCode).json(err);
        } else {
            res.status(200).json({
                data: data
            });
        }
    });
});

/* GET index page. */
router.get('/', (req, res, next) => {
    res.json({
        title: 'Express'
    });
});

export default router;
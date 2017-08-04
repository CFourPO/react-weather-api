import express from 'express';
const getLatLng = require('./getLatLng');
const darksky = require('./darksky');
const router = express.Router();


router.post('/darksky', (req, res, next) => {
    darksky.getForecast(req, (err, data) => {
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
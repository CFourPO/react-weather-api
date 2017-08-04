import request from "request";
const getLatLng = require('./getLatLng');

const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json'; // ?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY

module.exports.getForecast = (req, callback) => {
    
    getLatLng.getLatLng(req.body.address, (err, data) => {
        if (data) {
            let tmpPromise = new Promise((resolve, reject) => {
                request({   
                    url: `https://api.darksky.net/forecast/7a4c0d47fc0792a02d420cf8cb992410/${data.lat},${data.lng}`
                }, (err, response, body) => {
                    if (err) {
                        reject(err);
                    } else {
                        let results = JSON.parse(body);
                        let currently = results.currently;
                        let minutely = results.minutely;
                        let hourly = results.hourly;
                        let daily = results.daily;

                        let dailyResults = [];
                        daily.data.forEach(day => {
                            let obj = {};
                            // obj.dayOfWeek = new Date(day.time * 1000).getDay();
                            obj.dayOfWeek = new Date(day.time * 1000).getDay();
                            obj.details = day;
                            obj.minTemp = {
                                temp: day.apparentTemperatureMin,
                                time: new Date(day.apparentTemperatureMinTime * 1000)
                            };
                            obj.maxTemp = {
                                temp: day.apparentTemperatureMax,
                                time: new Date(day.apparentTemperatureMaxTime * 1000)
                            };
                            obj.time = new Date(day.time * 1000);
                            obj.summary = day.summary;
                            obj.rain = day.precipProbability >= .5
                            dailyResults.push(obj);
                        });

                        let responseObj = {
                            summary: daily.summary,
                            dayDetails: dailyResults,
                            lat: data.lat,
                            lng: data.lng
                        };

                        resolve(responseObj);
                    }
                });
            });

            tmpPromise.then(
                data => {
                    callback(null, data);
                },
                error => {
                    callback(error);
                });
        } else {
            callback(error);
        }
    })
};


module.exports.getHourlyForecast = (req, callback) => {
    let lat = req.body.lat,
        lng = req.body.lng,
        time = req.body.time;

        console.log(lat, lng, time);
    let promise = new Promise((resolve, reject) => {
        request({url: `https://api.darksky.net/forecast/7a4c0d47fc0792a02d420cf8cb992410/${lat},${lng},${time}`},
            (err, response, body) => {
                if (err) {
                    reject(err);
                } else {
                    let results = JSON.parse(body);
                    console.log("Results from hourly", results);
                    resolve(results);
                }
            });
    });

    promise.then(
        data => {
            callback(null, data);
        }, error => {
            callback(error);
        });
};
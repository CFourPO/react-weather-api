import request from "request";
const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json'; // ?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY

module.exports.getLatLng = (address, callback) => {

console.log(address);

    let promise = new Promise((resolve, reject) => {
        console.log(address);
        let qparams = {
            address: address,
            key: require('../config/config').GOOGLE_GEOCODE_KEY
        };
        request({
            url: 'https://maps.googleapis.com/maps/api/geocode/json',
            qs: qparams
        }, (err, response, body) => {
            let data = JSON.parse(body);
            // console.log(data);
            if (data.results.length > 0) {
                let tmpObj = {
                    formattedAddress: data.results[0].formatted_address,
                    lat: data.results[0].geometry.location.lat,
                    lng: data.results[0].geometry.location.lng
                };
                resolve(tmpObj);
                // callback(null, tmpObj);
            } else {
                let err = {
                    message: data.error_message,
                    status: data.status,
                    statusCode: response.statusCode
                };
                reject(err);
                // callback(err);
            }
        });
    });

    promise.then(
        data => {
            callback(null, data);
        }, error => {
            throw error;
        });
        // return new Promise((resolve, reject) => {
        //     console.log("IM HERER");
        //     request({
        //         url: 'https://maps.googleapis.com/maps/api/geocode/json',
        //         qs: qparams
        //     }, (err, response, body) => {
        //         let data = JSON.parse(body);
        //         if (data.results.length > 0) {
        //             let tmpObj = {
        //                 formattedAddress: data.results[0].formatted_address,
        //                 lat: data.results[0].geometry.location.lat,
        //                 lng: data.results[0].geometry.location.lng
        //             };
        //             resolve(tmpObj);
        //             // callback(null, tmpObj);
        //         } else {
        //             let err = {
        //                     message: data.error_message,
        //                     status: data.status,
        //                     statusCode: response.statusCode
        //                 };
        //                 reject(err);
        //             // callback(err);
        //         }
        //     });

    // })
}
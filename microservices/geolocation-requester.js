const cote = require('cote');
const requester = new cote.Requester({ name: 'geolocation requester' });

module.exports.sendGeolocationRequest = (address) => {
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
// module.exports.sendGeolocationRequest = (req, res, next) => {
//     requester.send({type: 'latlng', address: req.body.address }, (err, res) => {
//         if (err) {
//             console.log("Error: ", err);
//             req.status(err.statusCode || 500).json({ 
//                 message: "Error in Geolocation Requester", 
//                 err: err
//             });
//         } else {
//             req.body.lat = res.lat;
//             req.body.lng = res.lng;
//             req.body.formattedAddress = res.formattedAddress;
//             next();
//         }
//     });
// }

// requester.send(request, (err, res) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(res);
//     }
// });


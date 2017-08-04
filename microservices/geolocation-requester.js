const cote = require('cote');
const requester = new cote.Requester({ name: 'geolocation requester' });

const request = { type: 'latlng', address: 'New York City' };

module.exports.requester = requester;

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


'use strict';
var https = require('https');
console.log('Loading function');
var toReturn = '';

exports.handler = (event, context, callback) => {
    var options = {
        host: "graphhopper.com",
        port: 443,
        path: '/api/1/route?point=51.131%2C12.414&point=48.224%2C3.867&vehicle=car&locale=de&key=5bc68388-7e9f-4596-904b-90551bbf5acb',
        method: 'GET',
        json:true
        };

    var reqGet = https.request(options, function(res) {
        res.on('data', function (chunk) {
        toReturn = chunk.toString('utf8');
            });
        })
        .end();
    callback(null, toReturn);
};

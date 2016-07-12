'use strict';
var https = require('https');
console.log('Loading function');
var toReturn = '';
exports.handler = (event, context, callback) => {
    var startLocationQuery = encodeURI(event.Start);
    var startQueryPath = '/search/' + startLocationQuery + '?format=json&countrycode=gb';
    var options = {
        host: "nominatim.openstreetmap.org",
        port: 443,
        path: startQueryPath,
        method: 'GET',
        json:true
        };
    var startSearchResponse;
    var startLatLong;
    var endSearchResponse;
    var endLatLong;

    var reqGet = https.request(options, function(res) {
        res.on('data', function (chunk) {
                var endLocationQuery = encodeURI(event.End);
                var endQueryPath = '/search/' + endLocationQuery + '?format=json&countrycode=gb';
                var options1 = {
                    host: "nominatim.openstreetmap.org",
                    port: 443,
                    path: endQueryPath,
                    method: 'GET',
                    json:true
                };                
                startSearchResponse = JSON.parse(chunk);
                // toReturn += chunk.toString() + "\n========\n";
                startLatLong = startSearchResponse[0].lat + '%2C' + startSearchResponse[0].lon;
                var reqGet1 = https.request(options1, function(res1) {
                        res1.on('data', function (chunk1) {
                            endSearchResponse = JSON.parse(chunk1);
                            //toReturn = chunk1.toString() + "\n========\n";
                            endLatLong = endSearchResponse[0].lat + '%2C' + endSearchResponse[0].lon;
                            var options2 = {
                                host: "graphhopper.com",
                                port: 443,
                                path: '/api/1/route?point=' + startLatLong + '&point=' + endLatLong + '&vehicle=bike&key=a55445eb-e961-4151-8dce-e818b0052d75',
                                method: 'GET',
                                json:true
                            };
                            var reqGet = https.request(options2, function(res2) {
                                res2.on('data', function (chunk2) {
                                    toReturn = chunk2.toString('utf8');
                                    // toReturn = options2.path;
                                });
                            }).end();
                        });
                }).end();
            });
        }).end();
        callback(null, toReturn);
};
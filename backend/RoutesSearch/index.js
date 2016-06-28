'use strict';
var https = require('https');
console.log('Loading function');
var toReturn = '';
exports.handler = (event, context, callback) => {
    var startLocationQuery = encodeURI(event.Start);
    var endLocationQuery = encodeURI(event.End);
    var startQueryPath = '/search/' + startLocationQuery + '?format=json&countrycode=gb';
    var endQueryPath = '/search/' + endLocationQuery + '?format=json&countrycode=gb';
    var isStartStreetName = ! event.Start.lat;
    var isEndStreetName = ! event.End.lat;
    var startLat;
    var startLon;
    var endLat;
    var endLon;
    if (!isStartStreetName) {
        startLat = event.Start.lat;
        startLon = event.Start.lon;
        startQueryPath = '/reverse?format=json&lat=' + startLat + '&lon=' + startLon;
    }
    if (!isEndStreetName) {
        endLat = event.End.lat;
        endLon = event.End.lon;
        endQueryPath = '/reverse?format=json&lat=' + endLat + '&lon=' + endLon;
    }
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
                var options1 = {
                    host: "nominatim.openstreetmap.org",
                    port: 443,
                    path: endQueryPath,
                    method: 'GET',
                    json:true
                };                
                if (isStartStreetName) {
                      startSearchResponse = JSON.parse(chunk);
                      startLatLong = startSearchResponse[0].lat + '%2C' + startSearchResponse[0].lon;
                } else
                      startLatLong = startLat + '%2C' + startLon;
                var reqGet1 = https.request(options1, function(res1) {
                        res1.on('data', function (chunk1) {
                            if (isEndStreetName) {
                                endSearchResponse = JSON.parse(chunk1);
                                endLatLong = endSearchResponse[0].lat + '%2C' + endSearchResponse[0].lon;
                            } else
                                endLatLong = endLat + '%2C' + endLon;
                            var options2 = {
                                host: "graphhopper.com",
                                port: 443,
                                path: '/api/1/route?point=' + startLatLong + '&point=' + endLatLong + '&vehicle=bike&key=a55445eb-e961-4151-8dce-e818b0052d75',
                                method: 'GET',
                                json:true
                            };
                            var reqGet = https.request(options2, function(res2) {
                                res2.on('data', function (chunk2) {
                                    toReturn = chunk2.toString();
                                    callback(null, toReturn);
                                });
                            }).end();
                        });
                }).end();
            });
        }).end();
};
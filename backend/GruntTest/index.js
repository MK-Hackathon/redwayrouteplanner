'use strict';
const https = require('https');
const async = require('async');

const graphhopper = require('./graphhopper_key');

function getLocation(location, callback) {
    const options = {
        host: "nominatim.openstreetmap.org",
        port: 443,
        path: '/search/' + encodeURI(location) + '?format=json&countrycode=gb',
        method: 'GET',
        json:true
    };

    var responseString = '';
    https.request(options,
        function(res) {
            res.on('data', (chunk) => {
                responseString += chunk.toString('utf8');
            });

            res.on('end', () => {
                var response = JSON.parse(responseString);
                var latLong = encodeURI(response[0].lat + ',' + response[0].lon);
                callback(null, latLong);
            });
        }
    ).end();
};

function getRoute(locations, options, callback) {
    var requestOptions = {
        host: "graphhopper.com",
        port: 443,
        path: '/api/1/route?point=' + locations[0] + '&point=' + locations[1] + '&vehicle=bike&key=' + graphhopper.key,
        method: 'GET',
        json:true
    };

    var responseString = '';
    https.request(requestOptions,
        function(res) {
            res.on('data', (chunk) => {
                responseString += chunk.toString('utf8');
            });

            res.on('end', () => {
                var route = responseString.toString('utf8');
                callback(null, route);
            });
        }
    ).end();
};


exports.handler = (event, context, lambdaCallback) => {

    var err;
    var results;

    async.parallel([
        function(callback) {getLocation(event.Start, callback)},
        function(callback) {getLocation(event.End, callback)}
        ],
        function (err, results) {
            getRoute(results, {}, lambdaCallback);
        });
};
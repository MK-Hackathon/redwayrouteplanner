'use strict';
const https = require('https');
const async = require('async');
const waterfall = require('async-waterfall');

console.log('Loading function');
var toReturn = '';
var resultsSoFar = [];


function readChunk (chunk, responseString) {
    responseString += chunk.toString('utf8');
};

function getLocation(location, responseString) {
    const options = {
        host: "nominatim.openstreetmap.org",
        port: 443,
        path: '/search/' + encodeURI(location) + '?format=json&countrycode=gb',
        method: 'GET',
        json:true
    };
    responseString = '';

    https.request(options,
        function(res) {
            res.on('data', (chunk) => {
                responseString += chunk.toString('utf8');
            });

            res.on('end', () => {
                responseString += "\nFinished reading";
            });
        }
    ).end();
};

exports.handler = (event, context, lambdaCallback) => {

    var locationResults;
    var startLocation;
    var startLocationString;

    waterfall([
        function (finalStep){
            finalStep(null, toReturn);
        }
        getLocation(event.Start, startLocationString)
        ], 
        lambdaCallback(null, toReturn));

    getLocation(event.Start, startLocationString);

    toReturn = startLocationString;

    lambdaCallback(null, toReturn);
};
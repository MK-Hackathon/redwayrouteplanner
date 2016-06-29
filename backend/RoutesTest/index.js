'use strict';
var https = require('https');
// var async = require('async');
// var query = {in: ["Willen Lake", "Walnut Tree"], out: ""};
// var routesSearch = async.compose(graphHopper, openStreetMap, openStreetMap);

const graphhopper = require('./graphhopper_key');

var toReturn = "";

exports.handler = (event, context, callback) => {
	var graphHopper = function (input, callback) {
	    setTimeout(function() {
		    var options =     {
			host: "graphhopper.com",
			port: 443,
			method: 'GET',
			json:true
		    };
		    options.path = '/api/1/route?' + input + '&vehicle=bike&key=' + graphhopper.key;
		    https.request(options, function (res) {
			res.on('data', function (chunk) {
			    toReturn = chunk.toString();
			    // console.log(toReturn);
			    callback(null, toReturn);
			});}).end();
	    },10);
	};

	var openStreetMap = function (query, callback2) {
	    setTimeout(function () {
		    var updateLatLon = function(lat, lon) {
			var latLon = lat + '%2C' + lon;
			output = output + "point=" + latLon + "&";
			if (query.in.length == 1)
				callback2(null, output);
			else {
				var query1 = { in: Array.prototype.slice.call(query.in, 1), out: output };
				openStreetMap(query1, callback2);
			}
		    };
		    var input = query.in[0];
		    var output = query.out;
		    var isStreetName = ! input.lat;
		    if (!isStreetName) {
			updateLatLon(input.lat, input.lon);
		    } else {
		        var options = {
			   host: "nominatim.openstreetmap.org",
			   port: 443,
			   method: 'GET',
			   path: '/search/' + encodeURI(input) + '?format=json&countrycode=gb',
			   json:true
		        };
		        https.request(options, function (res) {
			    res.on('data', function (chunk) {
			    	var searchResponse = JSON.parse(chunk);
				updateLatLon(searchResponse[0].lat, searchResponse[0].lon);
			});}).end();
		    }
	    },10);
	};

	var openStreetMap2 = function(err, data) {
		// callback(null, data);
		graphHopper(data, callback);
	};

  var query = {in: [event.Start, event.End], out: ""};

  openStreetMap(query, openStreetMap2);
};


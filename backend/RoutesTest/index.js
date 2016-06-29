'use strict';
var https = require('https');
// var async = require('async');
// var query = {in: ["Willen Lake", "Walnut Tree"], out: ""};
// var routesSearch = async.compose(graphHopper, openStreetMap, openStreetMap);

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
		    options.path = '/api/1/route?' + input + '&vehicle=bike&key=a55445eb-e961-4151-8dce-e818b0052d75';
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
		    var options = {
			host: "nominatim.openstreetmap.org",
			port: 443,
			method: 'GET',
			json:true
		    };
		    var input = query.in[0];
		    var output = query.out;
		    var isStreetName = ! input.lat;
		    var lat;
		    var lon;
		    if (!isStreetName) {
			lat = input.lat;
			lon = input.lon;
			options.path = '/reverse?format=json&lat=' + lat + '&lon=' + lon;
		    } else {
			options.path = '/search/' + encodeURI(input) + '?format=json&countrycode=gb';
		    }
		    https.request(options, function (res) {
			res.on('data', function (chunk) {
			    var latLon = lat + '%2C' + lon;
			    if (isStreetName) {
				var searchResponse = JSON.parse(chunk);
				latLon = searchResponse[0].lat + '%2C' + searchResponse[0].lon;
			    }
			    output = output + "point=" + latLon + "&";
			    if (query.in.length == 1)
				callback2(null, output);
			    else {
				var query1 = { in: Array.prototype.slice.call(query.in, 1), out: output };
				openStreetMap(query1, callback2);
			    }
			});}).end();
	    },10);
	};

	var openStreetMap2 = function(err, data) {
		// callback(null, data);
		graphHopper(data, callback);
	};

  var query = {in: [event.Start, event.End], out: ""};

  openStreetMap(query, openStreetMap2);
};


'use strict';
console.log('Loading function');

exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    var toReturn = {
      search: event.search,
      version: "2",
      places: [ 
        {
          name: "Grunt_Place_1",
          lat: 0.1,
          lon: 0.2,
          info: "Some interesting info",
          features: [
            "amazing feature",
            "another amazing feature"
          ]
        },
        {
          name: "Grunt_Place_2",
          lat: 0.1436,
          lon: 0.2,
          info: "Some interesting info",
          features: [
            "amazing feature",
            "another amazing feature"
          ]
        }
      ]
    };
    
    callback(null, toReturn);  // Echo back the first key value
    // callback('Something went wrong');
};
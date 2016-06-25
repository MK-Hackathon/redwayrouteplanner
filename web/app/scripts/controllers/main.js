'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('MainCtrl', ['$scope', 'leafletData', function ($scope, leafletData) {

      $scope.findMyRoute = function() {
          console.log($scope.options);
      }

      angular.extend($scope, {
          center: {
              autoDiscover: true,
              zoom: 12
          }
      });

      leafletData.getMap('map').then(function(map) {
          map.locate({setView: true, maxZoom: 16, watch: true, enableHighAccuracy: true});
          map.on('locationfound', function (e) {
              console.log(e.latlng, e.accuracy)
              angular.extend($scope, {
                  markers: {
                      me: {
                          lat: e.latlng.lat,
                          lng: e.latlng.lng
                      }
                  }
              });
          });
      });


  }]);

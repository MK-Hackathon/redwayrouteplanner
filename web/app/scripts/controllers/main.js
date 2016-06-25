'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('MainCtrl', ['$scope', 'leafletData', 'routeFindingService',
      function ($scope, leafletData, routeFindingService) {

      $scope.findMyRoute = function() {
          routeFindingService.findRoutes($scope.options).then(function(routes) {
              console.log(routes);
              routes.forEach(function(route, i) {
                  $scope.paths[i+""] = {
                      type: 'polyline',
                      latlngs: route.points
                  }
              });

          });
      }
      $scope.paths = $scope.paths || {};

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

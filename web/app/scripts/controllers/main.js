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
          $scope.options = {
              route: 'fastest',
              minimiseHills: false,
              preferRoads: false
          };
      var colours = ['red', 'blue', 'green'],
          events = [];


      function unregisterEvents() {
          events.forEach(function(event){
              event();
          });
      }

      function addRoute(route, i) {
          $scope.paths[i+""] = {
              type: 'polyline',
              latlngs: route.points,
              color: colours[i],
              weight: 3
          };
          $scope.bounds = {
              southWest: {
                  lat: route.bbox[1],
                  lng: route.bbox[0]
              },
              northEast: {
                  lat: route.bbox[3],
                  lng: route.bbox[2]
              }
          };
          events.push($scope.$on('leafletDirectivePath.click', function(e, path) {
              $scope.selectedRoute = $scope.routes[parseInt(path.modelName)];
          }));

      }

      function addRoutes(routes) {
          $scope.routes = routes;
          unregisterEvents();
          routes.forEach(addRoute);
      }

      $scope.findMyRoute = function() {
          routeFindingService.findRoutes($scope.options).then(addRoutes);
      };

      $scope.viewSteps = function(i) {
          $scope.selectedRoute = $scope.routes[i];
      };

      $scope.paths = $scope.paths || {};
      $scope.bounds = $scope.bounds || {};

      angular.extend($scope, {
          center: {
              autoDiscover: true,
              zoom: 12
          }
      });

      leafletData.getMap('map').then(function(map) {
          map.locate({setView: true, maxZoom: 16, watch: true, enableHighAccuracy: true});
          map.on('locationfound', function (e) {
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

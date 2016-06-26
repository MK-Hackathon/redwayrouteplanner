'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:SatnavCtrl
 * @description
 * # SatnavCtrl
 * Controller of the webApp
 */
angular.module('webApp')
    .controller('SatnavCtrl', ['$scope', 'leafletData', 'routeFindingService', function ($scope, leafletData, routeFindingService) {
        $scope.paths = $scope.paths || [];
        $scope.bounds = $scope.bounds || {};
        $scope.activeStep = 0;
        $scope.reportIncident = function() {

        };
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
                leafletData.getPaths().then(function(paths){
                    var me = [e.latlng.lat, e.latlng.lng];
                    for(var i in paths){
                        if(paths[i].getBounds().contains(me)) {
                            console.info(i, 'is the active path');
                        }
                    };
                });
            });
        });
        routeFindingService.findRoutes({start: 'bletchley park', end: 'wolverton'}).then(function(routes) {
            var route = routes[0];
            $scope.route = route;
            var points = [];
            for(var i in routes.points) {
                points[i] = routes.points[i];
            }
            for(var i in route.instructions) {
                $scope.paths[i] = {
                    type: 'polyline',
                    latlngs: points.slice(route.instructions[i][0], route.instructions[i][1]),
                    weight: 3
                };
            }
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
            console.log(route.points);
        });
    }]);

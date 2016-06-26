(function () {
    'use strict';

    angular.module('webApp')
        .factory('routeFindingService', ['ghUtil','$http', function (ghUtil, $http) {

            var icons = {
                '-3': 'sharpLeft',
                '-2': 'left',
                '-1': 'slightLeft',
                '0': 'continue',
                '1': 'slightRight',
                '2': 'right',
                '3': 'sharpRight',
                '4': 'finish',
                '5': 'viaReached',
                '6': 'useRoundabout'
            };

            function translatePoints(points) {
                return points.map(function (point) {
                    return {
                        lat: point[1],
                        lng: point[0]
                    };
                });
            }

            function findRoutes(options) {
                var payload = {
                    Start: options.startingPoint + ', Milton Keynes',
                    End: options.endPoint + ', Milton Keynes'
                };
                if(options.route && (options.route == 'fastest' || options.route == 'shortest' )) {
                    payload.Route = options.route;
                }
                payload.MinimiseHills = !!options.minimiseHills;
                payload.PreferRoads = !!options.preferRoads;
                console.log(payload);
                return $http.post('https://3ffpwfgm6h.execute-api.eu-west-1.amazonaws.com/prod/routes', payload)
                .then(function(response) {
                    var route = JSON.parse(response.data).paths[0];
                    route.instructions.forEach(function (instruction) {
                        instruction.sign = icons[instruction.sign + ''];
                        instruction.time = Math.round(instruction.time / 1000 / 60);
                        instruction.distance = instruction.distance * 0.000621371192237;
                    });
                    route.points = translatePoints(ghUtil.decodePath(route.points, false));
                    return [route];

                });
            }

            return {
                findRoutes: findRoutes
            };
        }]);


})();

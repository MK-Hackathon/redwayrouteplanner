(function() {
    'use strict';

    angular.module('webApp')
    .factory('routeFindingService', ['ghUtil', function (ghUtil) {

        function translatePoints(points) {
            return points.map(function(point) {
                return {
                    lat: point[1],
                    lng: point[0]
                };
            });
        }

        function findRoutes() {
            return new Promise(function(resolve) {
                resolve([{
                    points: translatePoints(ghUtil.decodePath("mbw|H~h~Cj@EIoECmBnF[~AUpFc@NEzEwEbAiAtC_DdDvKlAzDh@`AdAfA^XrCcOG]Ac@Fa@q@_DqAaFsAsFwBmL[yBsBsRgC}Pg@oBc@qAoBgEu@aCWiAe@aC_AsGm@wFOkD[gO]{DESKg@MAMOG]@YLYJGj@PXEjB{@bBg@l@UbB{@hAu@bBqAnAgArB{Bj@w@b@u@F_@Da@IqA{Qu{@}AsG[y@OSOKOYEa@@_@J]NQRERFHJdAL`KiFxCeBtGwFbE_FlG}FVULYd@}@?UDUFMTQJ?JB|@GzBiA|DcBfEmAnC_A~CyA~CiBn@m@?]F]JOPIL?HDVSrEcFlCeDV[vCgDvCkDX]nC_D~CuDZ]@C", false))
                }]);
            });
        }

        return {
            findRoutes: findRoutes
        };
    }]);



})();

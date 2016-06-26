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
                    points: translatePoints(ghUtil.decodePath("mbw|H~h~Cj@EIoECmBnF[~AUpFc@NEzEwEbAiAtC_DdDvKlAzDh@`AdAfA^XrCcOG]Ac@Fa@q@_DqAaFsAsFwBmL[yBsBsRgC}Pg@oBc@qAoBgEu@aCWiAe@aC_AsGm@wFOkD[gO]{DESKg@MAMOG]@YLYJGj@PXEjB{@bBg@l@UbB{@hAu@bBqAnAgArB{Bj@w@b@u@F_@Da@IqA{Qu{@}AsG[y@OSOKOYEa@@_@J]NQRERFHJdAL`KiFxCeBtGwFbE_FlG}FVULYd@}@?UDUFMTQJ?JB|@GzBiA|DcBfEmAnC_A~CyA~CiBn@m@?]F]JOPIL?HDVSrEcFlCeDV[vCgDvCkDX]nC_D~CuDZ]@C", false)),
                    bbox: [-0.815678, 52.038963, -0.757355, 52.060717],
                    ascend: 53.3,
                    distance: 7036,
                    instructions: [
                        {
                            "distance": 25.148,
                            "sign": 0,
                            "interval": [
                                0,
                                1
                            ],
                            "text": "Continue",
                            "time": 4526
                        },
                        {
                            "distance": 109.152,
                            "sign": -2,
                            "interval": [
                                1,
                                3
                            ],
                            "text": "Turn left onto Aylesbury Street",
                            "time": 13096
                        },
                        {
                            "distance": 620.345,
                            "sign": 2,
                            "interval": [
                                3,
                                10
                            ],
                            "text": "Turn right onto Windsor Street",
                            "time": 74439
                        },
                        {
                            "distance": 323.373,
                            "sign": 2,
                            "interval": [
                                10,
                                14
                            ],
                            "text": "Turn right onto Gloucester Road",
                            "time": 38803
                        },
                        {
                            "distance": 20.212,
                            "sign": 0,
                            "interval": [
                                14,
                                15
                            ],
                            "text": "Continue",
                            "time": 2425
                        },
                        {
                            "distance": 194.524,
                            "sign": -2,
                            "interval": [
                                15,
                                16
                            ],
                            "text": "Turn left onto Great Monks Street, V5",
                            "time": 7294
                        }]
                }, {
                    points: translatePoints(ghUtil.decodePath("ixv|Hr}}CzGm@NEzEwEbAiAtC_DdDvKlAzDh@`AdAfA^XrCcOG]Ac@Fa@q@_DqAaFsAsFwBmL[yBsBsRgC}Pg@oBc@qAoBgEu@aCWiAe@aC_AsGm@wFOkD[gO]{DESKg@MAMOG]@YLYJGj@PXEjB{@bBg@l@UbB{@hAu@bBqAnAgArB{Bj@w@b@u@F_@Da@DMRSVATMNMfGwKdAwAr@{@|@aAdBwAdCaBhBq@vAa@|D_AnGwBnAi@RYTk@Lc@HINIlANTAvBkAxRoMzDcCTOPWRc@Lq@FiCEcBOoAiC{JcCgIQa@[[OEMQG[A]F]HMLKT?n@Od@QhFiGd@y@X]V]zCoDvCkDV[HVrD`LrAbE", false)),
                    bbox: [-0.815143, 52.036922, -0.764695, 52.059099],
                    ascend: 60.0,
                    distance: 6000
                }]);
            });
        }

        return {
            findRoutes: findRoutes
        };
    }]);



})();

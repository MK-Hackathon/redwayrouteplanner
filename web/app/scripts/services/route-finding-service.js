(function() {
    'use strict';

    angular.module('webApp')
    .factory('routeFindingService', ['ghUtil', function (ghUtil) {
        function findRoutes() {
            return new Promise(function(resolve) {
                resolve([{
                    points: ghUtil.decodePath("spw_IggrpA^}HZITWLMNh@xChGzE|Jz@bBRXV\\~@k@xLaG`Bs@pBQ~Lm@PEb@[NWJ_@V{BtAr@jBrA^RZ@n@GdB?dF[f@PNNV`@Xt@z@fCNd@~CkG~@eBNUVr@v@dAtMlXP\\pDvHVr@r@vB|CaD`_@s^j@e@TMT?zA{@D@DFpA`E`@p@b@h@v@d@j@Pt@JjAFpAB^BbB?jASxDIlAWd@_@r@w@l@kBp@sCRi@Te@pEyDhCoBn@_@dAc@\\G~@A^B\\FpMbGrCbAvEdArC?dCOvDm@fBOpGyBrAm@`Ai@nBk@zPwDl@Iv@ArCb@F@nDh@VHLNb@j@FFLPlAwC\\k@|@gAnCyBV[lA{BdEqIXm@rA}ATQzCeBzAcA`AoA^q@Xo@Zy@Ty@Jm@NoAPmBNcCBqA?kAG{KBiAHoATeChDkUDc@lHqAZEFs@LoB?gBGeBm@qLIcD?kAJuBLoATsAXgA^kAdDgI`@mAXyAJaADg@hEyd@hAqM`AuHrCmO`AgGtIsd@x@iCdF_R~BiIHUVsA~AsGvD{Nn@iCqAqAsCoC", false)
                }]);
            });
        }

        return {
            findRoutes: findRoutes
        };
    }]);



})();

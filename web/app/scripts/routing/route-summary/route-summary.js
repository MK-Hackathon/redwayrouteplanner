(function (angular) {

  function routeSummary() {

  }

  angular.module("redwayrouting").directive("routeSummary", function() {
    return {
      restrict: "AE",
      replace: "true",
      templateUrl: "route-summary.html"
    }
  });

})(angular);

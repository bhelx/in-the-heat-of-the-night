angular.module('app.controllers', [])

.controller('CrimeViewerCtrl', ['$scope', '$q', 'crimeData', function($scope, $q, crimeData) {
  $scope.crimeData = crimeData;

  $scope.spinnerOptions = {
    lines: 11,
    length: 23,
    width: 8,
    radius: 40,
    corners: 1,
    rotate: 9,
    speed: 1,
    trail: 50,
    shadow: true,
    hwaccel: false,
    className: "page-content-spinner",
    color: "#FFF",
    top: "50%",
    left: "50%"
  };

  $scope.state = {
    crimeType: 'All',
    loading: true
  };

  $scope.$watch('state.crimeType', function(value) {
    if(value === 'All') {
      crimeData.filteredTypes = [];
      crimeData.updateMapPoints();
    }
    else {
      crimeData.filteredTypes = [value];
      crimeData.updateMapPoints();
    }
  });

  // TODO: fetch error handling
  crimeData.fetch().then(function() {
    $scope.state.loading = false;
  });
}]);

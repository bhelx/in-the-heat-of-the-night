angular.module('app.controllers', [])

.controller('CrimeViewerCtrl', ['$scope', '$q', 'crimeData', function($scope, $q, crimeData) {
  $scope.crimeData = crimeData;

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

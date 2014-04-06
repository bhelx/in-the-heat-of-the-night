angular.module('app.controllers', [])

.controller('CrimeViewerCtrl', ['$scope', '$q', 'crimeData', function($scope, $q, crimeData) {
  $scope.crimeData = crimeData;

  $scope.state = {
    crimeType: '',
    loading: true
  };

  $scope.$watch('state.crimeType', function(value) {
    if(value) {
      crimeData.filteredTypes = [value];
      crimeData.updateMapPoints();
    }
    else {
      crimeData.filteredTypes = [];
      crimeData.updateMapPoints();
    }
  });

  // TODO: fetch error handling
  crimeData.fetch().then(function() {
    $scope.state.loading = false;
  });
}]);

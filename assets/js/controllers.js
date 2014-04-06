angular.module('app.controllers', [])

.controller('CrimeViewerCtrl', ['$scope', '$q', 'crimeData', function($scope, $q, crimeData) {
  $scope.crimeData = crimeData;
  $scope.options   = {
    crimeType: 'All'
  };

  $scope.$watch('options.crimeType', function(value) {
    if(value === 'All') {
      crimeData.filteredTypes = [];
      crimeData.updateMapPoints();
    }
    else {
      crimeData.filteredTypes = [value];
      crimeData.updateMapPoints();
    }
  });

  crimeData.fetch(); // TODO: spinner
}]);

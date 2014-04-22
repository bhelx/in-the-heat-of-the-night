angular.module('app.controllers', [])

.controller('CrimeViewerCtrl', ['$scope', 'crimeData', function($scope, crimeData) {
  $scope.crimeData = crimeData;

  $scope.state = {
    crimeType: 'All',
    loading: true
  };

  $scope.config = {
    crimeTypeOptions: ['All'],
    spinnerOptions: {
      lines:      11,
      length:     23,
      width:      8,
      radius:     40,
      corners:    1,
      rotate:     9,
      speed:      1,
      trail:      50,
      shadow:     true,
      hwaccel:    false,
      className: 'page-content-spinner',
      color:     '#FFF',
      left:      '50%',
      top:       '50%'
    }
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
    $scope.config.crimeTypeOptions = $scope.config.crimeTypeOptions.concat(crimeData.getCrimeTypes());
    $scope.state.loading = false;
  });
}]);

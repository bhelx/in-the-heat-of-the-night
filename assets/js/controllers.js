angular.module('app.controllers', [])

.controller('CrimeViewerCtrl', ['$scope', 'crimeData', function($scope, crimeData) {
  $scope.crimeData = crimeData;

  $scope.data = {
    state: {
      crimeType: 'All',
      loading: true
    },
    config: {
      crimeTypeOptions: [],
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
    }
  };

  $scope.$watch('data.state.crimeType', function(value) {
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
    $scope.data.config.crimeTypeOptions = crimeData.getCrimeTypes().concat('All');
    $scope.data.state.loading = false;
  });
}]);

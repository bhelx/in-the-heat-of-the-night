angular.module('app', [])

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
}])

.service('crimeData', ['$http', '$q', function($http, $q) {
  var crimeData = this;

  this.incidents     = [];
  this.filteredTypes = [];
  this.mapPoints     = [];

  this.fetch = function() {
    var deferred = $q.defer();

    // TODO: handle fetch error
    $http.get('/spot_crime').success(function(response) {
      crimeData.incidents  = response.crimeList;
      crimeData.crimeTypes = crimeData.getCrimeTypes();
      crimeData.updateMapPoints();
      deferred.resolve();
    });

    return deferred.promise;
  };

  this.getCrimeTypes = function() {
    var crimeTypes = _.map(crimeData.incidents, function(incident) {
      return incident.cname; // TODO: trim
    });

    return _.uniq(crimeTypes);
  };

  this.updateMapPoints = function() {
    var points = _.map(crimeData.incidents, function(incident) {
      if(!crimeData.filteredTypes.length || _.contains(crimeData.filteredTypes, incident.cname)) {
        return new google.maps.LatLng(parseFloat(incident.clatitude), parseFloat(incident.clongitude));
      }
    });

    crimeData.mapPoints = _.compact(points);

    return this;
  };
}])

.directive('heatmap', function() {
  return {
    scope: {
      mapPoints: '='
    },
    link: function(scope, element, attributes) {
      var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(29.953611866615528, -90.0817357447147),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        scrollwheel: true,
        zoomControl: true,
        draggable: true,
        navigationControl: true,
        mapTypeControl: false,
        scaleControl: true,
        disableDoubleClickZoom: false
      };

      var map = new google.maps.Map(element[0], mapOptions),
          heatmapLayer;

      scope.$watch('mapPoints', function(value) {
        if (heatmapLayer) {
          heatmapLayer.setMap(null);
        }

        heatmapLayer = new google.maps.visualization.HeatmapLayer({
          data: scope.mapPoints,
          radius: 20,
          opacity: 0.5,
          maxIntensity: 15
        });

        heatmapLayer.setMap(map);
      });
    }
  };
});

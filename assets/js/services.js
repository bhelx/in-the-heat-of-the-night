angular.module('app.services', [])

.service('crimeData', ['$http', '$q', function($http, $q) {
  var crimeData = this;

  this.incidents     = [];
  this.filteredTypes = [];
  this.mapPoints     = [];

  this.fetch = function() {
    var deferred = $q.defer();

    // TODO: handle fetch error
    $http.get('/calls_data').success(function(response) {
      crimeData.incidents  = response.features;
      crimeData.crimeTypes = crimeData.getCrimeTypes();
      crimeData.updateMapPoints();
      deferred.resolve();
    });

    return deferred.promise;
  };

  this.getCrimeTypes = function() {
    var crimeTypes = _.map(crimeData.incidents, function(incident) {
      return incident.properties.Categories;
    });

    return _.uniq(_.flatten(crimeTypes));
  };

  this.updateMapPoints = function() {
    // TODO - support more than one filter type
    var filteredType = crimeData.filteredTypes[0];
    var points = _.map(crimeData.incidents, function(incident) {
      if(incident.geometry.coordinates.length && (!filteredType || _.contains(incident.properties.Categories, filteredType))) {
        return new google.maps.LatLng(incident.geometry.coordinates[1], incident.geometry.coordinates[0]);
      }
    });

    crimeData.mapPoints = _.compact(points);

    return this;
  };
}]);

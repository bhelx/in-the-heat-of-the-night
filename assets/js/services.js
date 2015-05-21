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
    // var crimeTypes = _.map(crimeData.incidents, function(incident) {
    //   return _.str.trim(incident.properties.TypeText);
    // });

    //return _.uniq(crimeTypes);

    // Return no filters for now
    return [];
  };

  this.updateMapPoints = function() {
    var points = _.map(crimeData.incidents, function(incident) {
      if(incident.geometry.coordinates.length && (!crimeData.filteredTypes.length || _.contains(crimeData.filteredTypes, incident.properties.typetext))) {
        return new google.maps.LatLng(incident.geometry.coordinates[1], incident.geometry.coordinates[0]);
      }
    });

    crimeData.mapPoints = _.compact(points);

    return this;
  };
}]);

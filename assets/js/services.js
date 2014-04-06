angular.module('app.services', [])

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
}]);

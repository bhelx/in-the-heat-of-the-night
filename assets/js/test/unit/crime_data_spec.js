describe('crime data service', function() {
  var $httpBackend, crimeData;

  beforeEach(module('app'));

  beforeEach(inject(function(_$httpBackend_, _crimeData_) {
    $httpBackend = _$httpBackend_;
    crimeData    = _crimeData_;
  }));

  describe('fetch', function() {
    it('should be able to fetch and store incidents', function() {
      $httpBackend.whenGET(/^\/spot_crime*/).respond({crimeList: []});

      crimeData.fetch().then(function() {
        expect(crimeData.incidents).toEqual([]);
      });

      $httpBackend.flush();
    });
  });

  describe('getCrimeTypes', function() {
    it('should be able to return a list of crime types', function() {
      $httpBackend.whenGET(/^\/spot_crime*/).respond({crimeList: [
        { cname: 'Assault' },
        { cname: 'Burglary' },
        { cname: 'Theft' }
      ]});

      crimeData.fetch().then(function() {
        var crimeTypes = crimeData.getCrimeTypes();

        expect(crimeTypes[0]).toEqual('Assault');
        expect(crimeTypes[1]).toEqual('Burglary');
        expect(crimeTypes[2]).toEqual('Theft');
      });

      $httpBackend.flush();
    });
  });

  describe('updateMapPoints', function() {
    it('should return an array of Google Maps LatLng objects with no filter', function() {
      $httpBackend.whenGET(/^\/spot_crime*/).respond({crimeList: [
        { cname: 'Assault', clatitude: 0, clongitude: 0 },
        { cname: 'Burglary', clatitude: 30, clongitude: -30 },
        { cname: 'Theft', clatitude: 60, clongitude: -60 }
      ]});

      crimeData.fetch().then(function() {
        crimeData.updateMapPoints();

        var mapPoints = crimeData.mapPoints;

        expect(mapPoints[0].lat()).toEqual(0);
        expect(mapPoints[0].lng()).toEqual(0);

        expect(mapPoints[1].lat()).toEqual(30);
        expect(mapPoints[1].lng()).toEqual(-30);


        expect(mapPoints[2].lat()).toEqual(60);
        expect(mapPoints[2].lng()).toEqual(-60);
      });

      $httpBackend.flush();
    });

    it('should return an array of Google Maps LatLng objects with a filter set', function() {
      $httpBackend.whenGET(/^\/spot_crime*/).respond({crimeList: [
        { cname: 'Assault', clatitude: 0, clongitude: 0 },
        { cname: 'Burglary', clatitude: 30, clongitude: -30 },
        { cname: 'Theft', clatitude: 60, clongitude: -60 }
      ]});

      crimeData.fetch().then(function() {
        crimeData.filteredTypes = ['Assault'];
        crimeData.updateMapPoints();

        var mapPoints = crimeData.mapPoints;

        expect(mapPoints.length).toEqual(1);
        expect(mapPoints[0].lat()).toEqual(0);
        expect(mapPoints[0].lng()).toEqual(0);
      });

      $httpBackend.flush();
    });
  });
});
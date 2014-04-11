describe('crime viewer controller', function() {
  var $httpBackend, scope, crimeData, CrimeViewerCtrl;

  beforeEach(function() {
    module('app.services');
    module('app.controllers');
  });

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, _crimeData_) {
    $httpBackend    = _$httpBackend_;
    scope           = $rootScope.$new();
    crimeData       = _crimeData_;
    CrimeViewerCtrl = $controller('CrimeViewerCtrl', { $scope: scope });
  }));

  it('should update the filtered crime types array when filtered crime type is reset (filter disabled)', function() {
    $httpBackend.whenGET('/spot_crime').respond([]);

    scope.data.state.crimeType = 'All';
    scope.$digest();

    expect(crimeData.filteredTypes).toEqual([]);
  });

  it('should update the filtered crime types array when filtered crime type is set (filter enabled)', function() {
    $httpBackend.whenGET('/spot_crime').respond([]);

    scope.data.state.crimeType = 'Assault';
    scope.$digest();

    expect(crimeData.filteredTypes).toEqual(['Assault']);
  });

  it('should update the map points array when filtered crime type changes', function() {
    $httpBackend.whenGET('/spot_crime').respond({crimeList: [
      { cname: 'Assault', clatitude: 0, clongitude: 0 },
      { cname: 'Burglary', clatitude: 30, clongitude: -30 },
      { cname: 'Burglary', clatitude: 40, clongitude: -40 }
    ]});

    $httpBackend.flush();

    scope.data.state.crimeType = 'Assault';
    scope.$digest();

    expect(crimeData.mapPoints.length).toBe(1);
    expect(crimeData.mapPoints[0].lat()).toBe(0);
    expect(crimeData.mapPoints[0].lng()).toBe(0);

    scope.data.state.crimeType = 'Burglary';
    scope.$digest();

    expect(crimeData.mapPoints.length).toBe(2);
    expect(crimeData.mapPoints[0].lat()).toBe(30);
    expect(crimeData.mapPoints[0].lng()).toBe(-30);
    expect(crimeData.mapPoints[1].lat()).toBe(40);
    expect(crimeData.mapPoints[1].lng()).toBe(-40);
  });
});

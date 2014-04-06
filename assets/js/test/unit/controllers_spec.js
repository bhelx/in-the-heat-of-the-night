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

  beforeEach(function() {
    $httpBackend.whenGET('/spot_crime').respond([]);
  });

  it('should update the filtered crime types array when state.crimeType is reset (filter disabled)', function() {
    scope.state.crimeType = 'All';
    scope.$apply();

    expect(crimeData.filteredTypes).toEqual([]);
  });

  it('should update the filtered crime types array when state.crimeType is a specific value (filter enabled)', function() {
    scope.state.crimeType = 'Assault';
    scope.$apply();

    expect(crimeData.filteredTypes).toEqual(['Assault']);
  });
});
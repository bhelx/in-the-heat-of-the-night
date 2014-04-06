describe('app', function() {
  var ptor = protractor.getInstance();

  beforeEach(function() {
    browser.get('http://localhost:9292');
  });

  it('should display a list of crime type radio buttons', function() {
    var numberOfInputs = element.all(protractor.By.css('.crime-filter-list-radio')).count();
    expect(numberOfInputs).toBeGreaterThan(1);
  });

  it('should display a map', function() {
    var map = element.all(protractor.By.css('.heatmap-canvas .gm-style'));
    expect(map.count()).toEqual(1);
  });
});

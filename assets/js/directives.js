angular.module('app.directives', [])

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

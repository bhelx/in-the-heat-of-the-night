var map, heatmap, crimeData, googleData;

function unique(array){
  return array.filter(function(el,index,arr){
    return index == arr.indexOf(el);
  });
}

function writeHeatMap (data) {
  var googleData = toGoogleData(data);

  if (heatmap) heatmap.setMap(null);

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: googleData,
    radius: 20,
    opacity: 0.5,
    maxIntensity: 15
  });
  heatmap.setMap(map);

  $("#spin_modal_overlay").remove();
}

function fetchCrimeData(cb) {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/data/spot_crime.json",
    success: cb
  });
}

function handleData(data) {
  var types = unique($.map(data.crimeList, function (crime) {
    return $.trim(crime.cname);
  }));

  var $types = $('.crime-types');
  types.forEach(function (type) {
    $types.append('<li><label><input type="radio" name="crime-type" value="'+type+'">'+type+'</label></li>');
  });

  $('input[name="crime-type"]').click(writeHeatMap);

  crimeData = data;

  writeHeatMap();
}

/**
 * Turns our crime data into google latlngs
 */
function toGoogleData(data) {
  var filter = $('input[name="crime-type"]:checked').val();
  if (filter == "All") filter = null;

  return crimes = $.map(crimeData.crimeList, function (crime) {
    if (!filter || filter == crime.cname) {
      return new google.maps.LatLng(parseFloat(crime.clatitude), parseFloat(crime.clongitude));
    }
  });
}

function initialize() {

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

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  $('#map-canvas').spin('modal');

  fetchCrimeData(handleData);

}

google.maps.event.addDomListener(window, 'load', initialize);


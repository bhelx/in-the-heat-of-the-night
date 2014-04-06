window.google = {
  maps: {
    LatLng: function(lat, lng) {
      return {
        latitude:  parseFloat(lat),
        longitude: parseFloat(lng),

        lat: function() { return this.latitude;  },
        lng: function() { return this.longitude; }
      };
    }
  }
};

export default {

  methods: {
    getGeo: function(address, city, state, callback) {
        var joinedAddress = address.replace(/ /g,'+') + ',' + '+' + city.replace(/ /g,'+') + ',' + '+' + state;
        var apiKey = 'AIzaSyD7bfC_a_1IZa-ujwvD6mxJT6TSR4Fsxe8';
        this.$http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + joinedAddress +'&key=' + apiKey)
            .then(response => {
                return {"type": "point", "coordinates": [response.data.results[0].geometry.location.lng, response.data.results[0].geometry.location.lat]};
            }, response => {

            });
    }
  }
}
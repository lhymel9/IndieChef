export default {

  mounted: function() {

    navigator.geolocation.getCurrentPosition(position =>  {
        this.options.url = 'http://localhost:4000/api/vendors?lng=' + position.coords.longitude.toString() + '&lat=' + position.coords.latitude.toString();
    });

  },

  methods: {

    getVendors: function (url) {

      this.$http.get(url)
        .then(response => {
          this.vendors = response.data;

        }, response => {

        });

    },

    pingForVendors: function () {

      this.location[0] = this.options.currAddress.replace(/ /g, '+');
      this.$http.get('https://maps.googleapis.com/maps/api/geocode/json?address=+' + this.location[0] + '&key=AIzaSyCATmykaeqQHP5uLsOSLmTs6YPzr-hGnhw')
        .then(response => {

          this.location[1] = response.data.results[0].geometry.location.lat.toString(),
          this.location[2] = response.data.results[0].geometry.location.lng.toString() 
          
          var url = 'http://localhost:4000/api/vendors?lng=' + this.location[2] + '&lat=' + this.location[1];

          this.getVendors(url);

        }, response => {

        });
    }

  },

  computed: {

    filteredVendors: function () {

      var myOptions = this.options;
      return this.vendors.filter(function(vendor){
        var dist;

        if (myOptions.maxDistance === 'Any')
          dist = 24145;
        else
          dist = parseFloat(myOptions.maxDistance.substring(1,3))/.00062137;

        return vendor.obj.foodTypes.some(r=> myOptions.checkedFoods.includes(r)) &&
               parseFloat(vendor.obj.rating) >= parseFloat(myOptions.leastRating.substring(1,4)) &&
               vendor.dis <= dist;
      });

    }

  }

}


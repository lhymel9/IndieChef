export default {

  created: function() {
    navigator.geolocation.getCurrentPosition(position =>  {
        this.options.url = 'http://localhost:4000/api/vendors?lng=' + position.coords.longitude.toString() + '&lat=' + position.coords.latitude.toString();
    });

  },

  methods: {

    getVendors: function (url) {

      this.$http.get(url)
        .then(response => {
          this.vendors = response.data;
          this.getItems();
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

        return vendor.obj.name.toLowerCase().includes(myOptions.searchCriteria.toLowerCase()) &&
               vendor.obj.foodTypes.some(r=> myOptions.checkedFoods.includes(r)) &&
               parseFloat(vendor.obj.rating) >= parseFloat(myOptions.leastRating.substring(1,4)) || vendor.obj.rating  === null &&
               vendor.dis <= dist;
      });

    }

  }

}


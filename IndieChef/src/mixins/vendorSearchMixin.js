export default {
  created: function () {

  this.$http.get('http://env2.zs6znymmyc.us-east-1.elasticbeanstalk.com/api/vendors/')
    .then(response => {
      this.vendors = response.data;
    }, response => {

    });
    
  },

  computed: {
    filteredVendors: function () {
      return this.vendors.filter(function(vendor){
        return distanceFrom(vendor) <= options.maxDistance &&
               vendor.foodTypes.some(r=> options.checkedFoods.includes(r)) &&
               vendor.rating >= options.leastRating;
      });
    }
  }
}

export default {
    methods: {
        submitVendorChanges: function(vendor, id) {
            this.$http.put('http://localhost:4000/api/vendors/' + vendor._id.toString(), vendor)
                .then(response => {
                    console.log("New Vendor Information:\n " + response.data);
                    this.resetNewVendor(id);
                    location.reload();
                }, response => {
                    console.log("Error updating vendor.")
                });
        },

        applyNameChanges: function(vendor, name) {
            vendor.name = name;

            this.submitVendorChanges(vendor, name);
        },

        applyEmailChanges: function(vendor, email) {
            vendor.email = email;

            this.submitVendorChanges(vendor, email);
        },

        applyAddressChanges: function(vendor, address) {
            vendor.address = address;

            this.submitVendorChanges(vendor, address);
        },

        applyPhoneChanges: function(vendor, phone) {
            vendor.phone = phone;

            this.submitVendorChanges(vendor, phone);
        },

        applyFoodChanges: function(vendor, foods) {
            vendor.foodTypes = foods;

            this.submitVendorChanges(vendor, '03');
        },

        resetNewVendor: function(id) {
            this.allTypes = this.allTypes.concat(this.newVendor.foods);
            
            for(var prop in this.newVendor) {
                if (prop.toString() !== 'foods')
                    this.newVendor[prop] = '';
                else
                    this.newVendor[prop] = [];
            }

            document.getElementById(id).style.display='none';
        },

        setupFoodsEdit: function(vendor) {
            var self = this;

            vendor.foodTypes.forEach(function(type) {
                self.newVendor.foods.push(type);
            });

            vendor.foodTypes.forEach(function(type) {
                var location = self.allTypes.indexOf(type);
                self.allTypes.splice(location, 1);
            });

            document.getElementById('03').style.display='block';
        },
    }
}
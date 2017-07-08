import store from '../../store';

export default {
    created: function() {
        this.cart = store.getters.getCart;
        
        this.calcTotal(this.cart);
        this.countVendors(this.cart);
    },

    methods: {
        countVendors: function(cart) {
            var creators = [],
                self = this;
            cart.forEach(function(item) {
                if(!creators.includes(item._creator)) {
                    self.vendorCount = self.vendorCount + 1;
                    creators.push(item._creator);
                }
            });
        },

        calcTotal: function(cart) {
            var self = this;
            cart.forEach(function(item) {
                self.total = self.total + parseFloat(item.cost);
            });
        },

        removeItem: function(item) {
            this.$store.dispatch("removeFromCart", item)
              .then(() => {
                console.log("Item removed from cart.");
                location.reload();
              });
        }
    }
}
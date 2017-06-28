import store from '../../store';

export default {

    created: function() {

        this.$http.get('http://localhost:4000/api/orders/' + store.getters.creatorId.toString())
            .then(response => {

                this.activeOrders = response.data;

            }, response => {

                console.log("Sever Error: Could not access active orders.");

            });

    },

    methods: {
        expandSale: function(id) {
            var doc = document.getElementById(id);
            if (doc.className.indexOf("w3-show") == -1) {
                doc.className += " w3-show";
            } else { 
                doc.className = doc.className.replace(" w3-show", "");
            }
        }
    }
}
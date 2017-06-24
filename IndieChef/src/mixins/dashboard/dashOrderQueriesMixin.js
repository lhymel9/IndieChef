import store from '../../store';

export default {

    created: function() {

        this.$http.get('http://localhost:4000/api/orders/' + store.getters.creatorId.toString())
            .then(response => {

                this.activeOrders = response.data;

            }, response => {

                console.log("Sever Error: Could not access active orders.");

            });

    }
}
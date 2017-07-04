import store from '../store';

export default {
    methods: {
        goToDash: function() {
            var myToken = store.getters.getToken.toString(),
            myId = store.getters.vendorId.toString(),
            url = ["/dashboard/usr=", myId, "&tok=", myToken].join("");
            this.$router.push({path: url});
        }
    }
}
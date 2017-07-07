import store from '../store';

export default {
    methods: {
        goToDash: function() {
            if (store.getters.getToken === null || store.getters.vendorId === null)
                this.$router.push("/login");
            else {
                var myToken = store.getters.getToken.toString(),
                    myId = store.getters.vendorId.toString(),
                     url = ["/dashboard/usr=", myId, "&tok=", myToken].join("");
                     
                this.$router.push({path: url});
            }
        },

        goToItem: function(id) {
            var url = ["/item/id=", id].join("");
            this.$router.push({path: url});
            location.reload();
        },

        gotToHome: function() {
            this.$router.push("/");
        }
    }
}
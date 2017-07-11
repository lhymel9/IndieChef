import store from '../store';

export default {
    methods: {
        goToDash: function() {
            if (store.getters.getToken == null || store.getters.vendorId == null)
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

        goToHome: function() {
            this.$router.push("/");
        },

        goToCart: function() {
            this.$router.push('/cart');
        },

        signOut: function() {
            this.$store.dispatch("logout")
                .then(() => {
                    this.goToHome();
                });
        },

        goToLogin: function() {
            if(store.getters.isLoggedIn)
                this.goToDash();
            else
                this.$router.push('/login');
        }
    }
}
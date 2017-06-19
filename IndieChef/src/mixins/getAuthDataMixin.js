import store from '../store';

export default {
    created: function() {
        this.$http.get('http://localhost:4000/api/token_confirm/' + store.getters.getToken.toString())
            .then(response => {
                this.$store.dispatch("setVendor", response.data)
                .then(() => {
                    if(response.data.hasOwnProperty("error"))
                        console.log("error: " + response.data.error);
                    else
                        console.log("Instance for vendor: " + response.data.name + " created.");
                });
            }, response => {
                console.log("Server Error: Failed to authenticate vendor.")
            });
    }
}
export default {
    computed: function() {
        this.$http.get('http://localhost:4000/api/token_confirm/' + store.getters.getToken.toString())
            .then(response => {
                
            }, response => {

            });
    }
}
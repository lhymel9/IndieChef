export default {
    methods: {
        submitItemChanges: function(item) {
            this.$http.put('http://localhost:4000/api/items/' + item._id.toString(), item)
                .then(response => {
                    console.log(response.data);
                    document.getElementById(item.name).style.display='none';
                }, response => {
                    console.log("Error updating item.")
                });
        }
    }
}
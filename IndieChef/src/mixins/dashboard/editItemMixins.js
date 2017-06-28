export default {
    methods: {
        submitItemChanges: function(item) {
            this.$http.put('http://localhost:4000/api/items/' + item._id.toString(), item)
                .then(response => {
                    this.resetAllTypes(item);
                    location.reload();
                }, response => {
                    console.log("Error updating item.")
                });
        },

        upload: function(formData) {
            this.$http.post('http://localhost:4000/images/', formData)
                .then(response => {
                    console.log(response.data);
                }, response => {
                    console.log("Error uploading image to server.");
                });
        },

        changeTypes: function(foodType, source, target) {
            var location = source.indexOf(foodType);
            source.splice(location, 1);
            target.push(foodType);
        },

        setupEdit: function(item) {
            var self = this;
            item.itemTypes.forEach(function(type) {
                var location = self.allTypes.indexOf(type);
                self.allTypes.splice(location, 1);
            });

            document.getElementById(item._saleId).style.display='block';

            this.oldItem.name = item.name;
            this.oldItem.cost = item.cost;
            this.oldItem.description = item.description;
            
            this.makeOldTypes(item, this.oldItem);
        },

        resetAllTypes: function(item) {
            document.getElementById(item._saleId).style.display='none';

            var self = this;
            item.itemTypes.forEach(function(type) {
                self.allTypes.push(type);
            });
        },

        revertItem: function(item) {
            this.resetAllTypes(item);

            item.name = this.oldItem.name;
            item.cost = this.oldItem.cost;
            item.description = this.oldItem.description;
            item.itemTypes = this.oldItem.itemTypes;

            this.resetOldItem();
        },

        makeOldTypes: function(item, oldItem) {
            item.itemTypes.forEach(function(type) {
                oldItem.itemTypes.push(type);
            });
        },

        resetOldItem: function() {
            this.oldItem.name = '';
            this.oldItem.cost = '';
            this.oldItem.description = '';
            this.oldItem.itemTypes = [];
        }
    }
}
export default {
    methods: {
        submitItemChanges: function(item) {
            var sendingItem = item;
            delete sendingItem.img;
            delete sendingItem.saleObjs;
            this.$http.put('http://localhost:4000/api/items/' + sendingItem._id.toString(), sendingItem)
                .then(response => {
                    this.resetAllTypes(item, item._saleId);
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

            this.oldItem.path = item.path;
        },

        resetAllTypes: function(item, id) {
            document.getElementById(id).style.display='none';

            var self = this;
            item.itemTypes.forEach(function(type) {
                self.allTypes.push(type);
            });
        },

        revertItem: function(item) {
            this.resetAllTypes(item, item._saleId);

            item.name = this.oldItem.name;
            item.cost = this.oldItem.cost;
            item.description = this.oldItem.description;
            item.itemTypes = this.oldItem.itemTypes;
            item.path = this.oldItem.path;

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
        },

        resetNew: function() {
            this.resetAllTypes(this.newItem, '01');
            this.imgSrc = '../../static/blankimg.png';
            
            for(var prop in this.newItem) {
                if (prop.toString() !== 'itemTypes')
                    this.newItem[prop] = '';
                else {
                    this.allTypes.concat(this.newItem.itemTypes);
                    this.newItem[prop] = [];
                }
            }

            this.isNext = false;
            location.reload();
        },

        submitNewItem: function(item) {
            var self = this;
            this.packItem(item, function() {
                self.$http.post('http://localhost:4000/api/items', item)
                    .then(response => {
                        self.imgItemId = response.data;
                        self.isNext = true;
                        console.log("Item: " + response.data + " created.");
                    }, response => {
                        console.log("Item creation failed.");
                    });
            });
        },

        packItem: function(item, callback) {
            var alphabet = "abcdefghijklmnopqrstuvwxyz";

            item._creator = this.loggedVendor._creatorId;
            item._saleId  = [alphabet[Math.floor(Math.random()*alphabet.length)], (Math.floor(Math.random()*900) + 100).toString(), alphabet[Math.floor(Math.random()*alphabet.length)],
                             (Math.floor(Math.random()*900) + 100).toString(), alphabet[Math.floor(Math.random()*alphabet.length)], (Math.floor(Math.random()*900) + 100).toString()].join("");
            item.rating = 'None';
            item.sales =  [];

            callback();
        }
    }
}
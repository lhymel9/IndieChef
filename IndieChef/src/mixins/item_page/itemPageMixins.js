import store from '../../store';
import tools from '../generalTools';

export default {

    created: function () {

        if (this.$route.params.id === '')
            this.nonItem = true;

        else {
            this.$http.get('http://localhost:4000/api/items/' + this.$route.params.id)
                .then(response => {
                    this.currItem = response.data;

                    this.findVendor(response.data._creator);
                    this.getStarSrc(response.data);

                    return new Promise(resolve => {
                        setTimeout(() => {
                            this.getImageData(this.currItem);
                            this.getRelatedImages();
                            this.setAdded();
                            resolve();
                        }, 150);
                    });

                }, response => {

                    console.log("Sever Error: Could not access item.");

                });
        }

    },

    methods: {

        findVendor: function(creatorId) {
            var self = this;
            if(typeof creatorId !== 'undefined') {
                this.$http.get('http://localhost:4000/api/vendor/creator/' + creatorId)
                    .then(response => {

                        this.assignMaker(response.data.name);
                        response.data.items.forEach(function(item) {
                            if (self.currItem._id !== item)
                                self.relatedItems.push({item: item});
                        });

                    }, response => {

                        console.log("Sever Error: Could not access vendor.\n");
                        console.log("\n" + response.data);

                    });
            }

            else
                this.nonItem = true;

        },

        shortenText: function(description, amount) {
            if (description.length > amount) {
                return description.substring(0, amount) + "...";
            }
            else
                return description;
        },

        assignMaker: function(name) {
            this.maker = name;
        },

        getRelatedImages: function() {
            var self = this;
            self.relatedItems.forEach(function(item) {
                self.$http.get('http://localhost:4000/api/images/' + item.item)
                    .then(response => {
                        item.src = "data:image/png;base64, " + atob(response.data);
                        self.count = self.count + 1;
                    }, response => {
                        console.log("Server Error: Cannot access related vendor pictures");
                    });
            });
        },

        addToCart: function(item) {
            this.$store.dispatch("addCartItem", item)
              .then(() => {
                console.log("Item added to cart.");
                location.reload();
              });
        },

        setAdded: function() {
            var self = this;
            store.getters.getCart.forEach(item => {
                if(item._id === self.currItem._id)
                    self.wasAdded = true;
            });
        }

    }


}
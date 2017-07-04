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
                            this.getImageData();
                            this.getRelatedImages();
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

        getStarSrc: function(item) {
            if(item.rating === 'None') {
                this.stars = [this.stars, '0_stars.png'].join("");
                return;
            }
            
            var rating = parseFloat(item.rating),
                divisions = [5.0, 4.5, 4.0, 3.5, 3.0, 2.5, 2.0, 1.5, 1.0, 0.5, 0.0],
                self = this;
                
            divisions.forEach(function(div, index) {
                if(rating <= div && rating > divisions[index + 1])
                    self.stars = [self.stars, div.toString(), "_stars.png"].join("");
            });
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

        getImageData: function() {
            this.$http.get('http://localhost:4000/api/images/' + this.currItem._id)
                .then(response => {
                    this.currItem.path = "data:image/png;base64, " + atob(response.data);
                }, response => {
                    this.currItem.path = '';
                });
        }

    }


}
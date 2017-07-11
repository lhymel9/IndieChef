export default {
    methods: {
        getStarSrc: function(item) {
            if(item.rating === 'None' || item.rating == null) {
                console.log("Made it here");
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

        makeStars: function(item) {
            var stars = '../../static/';

            if(item.rating === 'None' || item.rating == null) {
                stars = [stars, '0_stars.png'].join("");
                return stars;
            }
            
            var rating = parseFloat(item.rating),
                divisions = [5.0, 4.5, 4.0, 3.5, 3.0, 2.5, 2.0, 1.5, 1.0, 0.5, 0.0];
                
            divisions.forEach(function(div, index) {
                console.log("Is " + rating + " less than or equal to " + div + " and greater than " + divisions[index + 1] + "?");
                console.log(rating <= div && rating > divisions[index + 1]);
                if(rating <= div && rating > divisions[index + 1]) {
                    stars = [stars, div.toString(), "_stars.png"].join("");
                    console.log(stars);
                    return stars;
                }
            });
        },

        getImageData: function(item) {
            this.$http.get('http://localhost:4000/api/images/' + item._id)
                .then(response => {
                    item.path = "data:image/png;base64, " + atob(response.data);
                }, response => {
                    item.path = '';
                });
        },

        shortenText: function(description, amount) {
            if (description.length > amount) {
                return description.substring(0, amount) + "...";
            }
            else
                return description;
        },

        timeToDue: function(date) {
            var now = new Date();
            var then = new Date(date);
            return ((then - now)/(1000*60)).toFixed(2).toString() + " minutes";
        },

        formatPhone: function(phone)  {
            return [phone.substring(0, 3), phone.substring(3,6), phone.substring(6,10)].join("-")
        }
    }
}
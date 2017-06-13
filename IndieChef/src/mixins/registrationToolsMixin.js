export default {
    methods: {
        generatedAndChecked: function() {

            var gen = Math.floor((Math.random() * 100000000) + 1).toString();
            var url = 'http://localhost:4000/api/exists/vendor/' + gen;
            var exists = this.vendorExists(url);

            if(exists)
                return generatedAndChecked();
            else
                return gen;

        },

        vendorExists: function(url) {

            this.$http.get(url)
                .then(response => {

                    return response.data.answer;

                }, response => {

                });

        },

        generateList: function() {

            var formErrorChecks = 
                [{message: "Incorrect entry in the name field.",
                test:(!this.account[0].includes(' ') || this.account[0].length < 5)},
                {message: "Incorrect entry in the email field.",
                test: !this.account[1].includes('@') || this.account[1].length < 6},
                {message: "Please enter the same entry in each password field.",
                test: this.account[2] != this.account[3]},
                {message: "Please enter a valid address.",
                test: this.account[4].length < 6 || !this.account[4].includes(' ')},
                {message: "Please enter a valid zipcode.",
                test: this.account[5].length != 5 || isNaN(this.account[5])},
                {message: "Please enter a valid state entry.",
                test: this.account[7].length != 2 || !isNaN(this.account[7])}];

            this.errorArr = [];

            var self = this;
            formErrorChecks.forEach(function(item) {
                if(item.test)
                    self.errorArr.push(item.message)
            });
        }
    }
}
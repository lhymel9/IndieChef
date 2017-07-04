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

        generateErrorList: function(formErrors) {
            this.errorArr = [];

            var self = this;
            formErrors.forEach(function(item) {
                if(item.test)
                    self.errorArr.push(item.message)
            });

        },

        generateVendor: function(account, geo) {
            var newAccount = {
              "_creatorId":this.generatedAndChecked(),
              "email":account[1],
              "password":account[2],
              "name":account[0],
              "rating":null,
              "foodTypes":[],
              "address":account[4] + ", " + account[6] + ", " + account[7] + ", " + account[5],
              "phone":account[8],
              "approved":false,
              "items":[],
              "geometry":geo
            }

            this.$http.post('http://localhost:4000/api/vendors/', newAccount)
              .then(response => {
                console.log("Success: \nVendor with creator id: " + response.data._creatorId + " saved.");
              }, response => {
                console.log("Failure: \n" + response.data)
              });
        },

        generateCustomer: function(account, geo) {
            var newAccount = {
              "email":account[1],
              "password":account[2],
              "name":account[0],
              "address":account[4] + ", " + account[6] + ", " + account[7] + ", " + account[5],
              "geometry":geo
            }

            this.$http.post('http://localhost:4000/api/customers/', newAccount)
              .then(response => {
                console.log("Success: \nCustomer with id: " + response.data._id + " saved.");
              }, response => {
                console.log("Failure: \n" + response.data)
              });
        },

        trimInputs: function(inputs) {
            inputs = inputs.map(function(input) {
                return input.trim();
            });
        }
    },

    computed: {
        formErrorChecks: function() {
        return {
            array: 
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
            test: this.account[7].length != 2 || !isNaN(this.account[7])}]
            }
        }
    }
}
export default {

    created: function() {

        var self = this;

        this.$http.get('http://localhost:4000/api/vendor/' + this.$route.params.id.toString())
            .then(response => {

                this.getItemList(response.data.items, self);

            }, response => {

                console.log("Sever Error: Could not access vendors.");

            });

    },

    methods: {

        getItemList: function(items, env) {

            items.forEach(function(item) {
                env.$http.get('http://localhost:4000/api/items/' + item.toString())
                    .then(response => {

                        response.data.saleObjs = [];

                        env.genSales(response.data);

                        return new Promise(resolve => {
                            setTimeout(() => {
                                env.myItems.push(response.data);
                                resolve();
                            }, 100);
                        });

                    }, response => {

                        console.log("Server Error: Could not access item data.")

                    });
            });
        },

        genSales: function(item) {

            var self = this;

            if(typeof item.sales[0] !== 'undefined') {

                item.sales.forEach(function(sale) {
                    self.addSaleObj(item, sale, self);
                });

            }

            else
                item.saleObjs.push({date: "N/a"});
                
        },

        addSaleObj: function(item, sale, env) {
            env.$http.get('http://localhost:4000/api/sales/' + sale.toString())
                .then(response => {

                    item.saleObjs.push(response.data);

                }, response => {

                    console.log("Server Error: Could not access sale data.")

                });

        },

        shortenText: function(description) {
            if (description.length > 18) {
                return description.substring(0, 18) + "...";
            }
            else
                return description;
        },

        timeToDue: function(date) {
            var now = new Date();
            var then = new Date(date);
            return ((then - now)/(1000*60)).toFixed(2).toString() + " minutes";
        }

    }

}
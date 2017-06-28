export default {

    created: function() {

        var self = this;

        this.$http.get('http://localhost:4000/api/vendor/' + this.$route.params.id.toString())
            .then(response => {

                this.loggedVendor = response.data;
                
                this.getItemList(response.data.items, self);

                return new Promise(resolve => {
                    setTimeout(() => {
                        self.sortSales();
                        resolve();
                    }, 450);
                });

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

        sortSales: function() {
            var self = this;
            this.myItems.forEach(function(item) {
                item.saleObjs.forEach(function(sale) {
                    sale.itemName = item.name;
                    self.sortedSales.push(sale);
                });
            });

            return new Promise(resolve => {
                setTimeout(() => {
                    self.sortedSales.sort(self.compareByDate);
                    resolve();
                }, 250);
            });
        },

        compareByDate: function(saleA, saleB) {
            var dateA = new Date(saleA.date).setHours(0, 0, 0, 0),
                dateB = new Date(saleB.date).setHours(0, 0, 0, 0);
            
            if(dateA.valueOf() > dateB.valueOf())
                return -1
            if(dateA.valueOf() < dateB.valueOf())
                return 1
            return 0;
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
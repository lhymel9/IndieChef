import tools from '../generalTools';

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
                                env.getImage(response.data);
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
                
        },

        addSaleObj: function(item, sale, env) {
            env.$http.get('http://localhost:4000/api/sales/' + sale.toString())
                .then(response => {

                    item.saleObjs.push(response.data);

                }, response => {

                    console.log("Server Error: Could not access sale data.")

                });

        },

        getImage: function(item) {
            this.$http.get('http://localhost:4000/api/images/' + item._id)
            .then(response => {
                item.img = "data:image/png;base64, " + atob(response.data);
                this.myItems.push(item)
            }, response => {
                return;
            });
        },

        postImage: function(file) {

            this.$http.post('http://localhost:4000/api/images', file)
            .then(response => {
                console.log(response.data);
            }, response => {
                console.log(response.data);
            });
        }

    }

}
export default {
    methods: {
        getItems: function() {

            if (!this.options.searchType) {
                var re = this;
                re.filteredItems = [];
                this.filteredVendors.forEach(function(vendor, index) {
                    var re2 = re;
                    vendor.obj.items.forEach(function(itemId, index) {
                        var url = 'http://localhost:4000/api/items/' + itemId.toString();

                        re2.$http.get(url)
                            .then(response => {

                            var item = response.data;

                            item.distance = vendor.dis;
                            item.creatorName = vendor.obj.name;

                            re2.filteredItems.push(item);

                            }, response => {

                            });

                    });

                });
            }
        }
    }
}
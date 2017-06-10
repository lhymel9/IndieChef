export default {
    methods: {
        getItems: function() {
            var re = this;
            this.vendors.forEach(function(vendor, index) {
                 var re2 = re;
                 vendor.obj.items.forEach(function(itemId, index) {
                     var url = 'http://localhost:4000/api/items/' + itemId.toString();

                     re2.$http.get(url)
                         .then(response => {

                         var item = response.data;

                         item.distance = vendor.dis;
                         item.creatorName = vendor.obj.name;

                         re2.items.push(item);

                         }, response => {

                         });

                 });

            });
        }
    },

    computed: {
        filteredItems: function() {
            var myOptions = this.options;
            return this.items.filter(function(item) {
                var dist;

                if (myOptions.maxDistance === 'Any')
                    dist = 24145;
                else
                    dist = parseFloat(myOptions.maxDistance.substring(1,3))/.00062137;
                
                return (item.name.toLowerCase().includes(myOptions.searchCriteria.toLowerCase()) || item.creatorName.toLowerCase().includes(myOptions.searchCriteria.toLowerCase())) &&
                       item.itemTypes.some(r=> myOptions.checkedFoods.includes(r)) &&
                       item.distance <= dist;
            });
        }
    }
}
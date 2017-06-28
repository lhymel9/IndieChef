export default {
    created: function() {
        var self = this;
        return new Promise(resolve => {
            setTimeout(() => {
                self.sortedSales.forEach(function(sale) {
                    self.totalSales = parseFloat(sale.total) + self.totalSales;
                });
                resolve();
            }, 1200);
        });
    }
}
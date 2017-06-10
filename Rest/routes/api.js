const express = require('express');
const Vendor = require('../models/vendors');
const Item = require('../models/items');

const router = express.Router();

//for vendors
router.get('/vendors', function(request, response, next) {
    Vendor.geoNear(
        {type: "Point",
         coordinates: [parseFloat(request.query.lng),parseFloat(request.query.lat)]},
        {maxDistance: 24145,
         spherical: true}
    ).then(function(vendor) {
        response.send(vendor)
    });
});

router.post('/vendors', function(request, response, next) {
    Vendor.create(request.body).then(function(vendor) {
        response.send(vendor);
    }).catch(next);
});

router.delete('/vendors/:id', function(request, response, next) {
    Vendor.findByIdAndRemove({_id:request.params.id}).then(function() {
        response.send(vendor);
    });
});

router.put('/vendors/:id', function(request, response, next) {
    Vendor.findByIdAndUpdate({_id:request.params.id}, request.body).then(function() {
        Vendor.findOne({_id:request.params.id}).then(function(vendor) {
            response.send(vendor);
        });
    });
});


//for items
router.get('/items/:id', function(request, response, next) {
    Item.findOne({_id:request.params.id}).then(function(item) {
        response.send(item);
    });
});

router.post('/items', function(request, response, next) {
    Vendor.findOne({_creatorId:request.body._creator}).then(function(vendor) {
        Item.create(request.body).then(function(item) {
            vendor.items.push(item);
            vendor.save(function(err) {
                if (err) throw handleError(err);
                response.send(item);
            });
        });
    }).catch(next);
});

router.delete('/items/:id', function(request, response, next) {
    Item.findByIdAndRemove({_id:request.params.id}).then(function() {
        response.send(item);
    });
});

router.put('/items/:id', function(request, response, next) {
    Item.findByIdAndUpdate({_id:request.params.id}, request.body).then(function() {
        Item.findOne({_id:request.params.id}).then(function(item) {
            response.send(item);
        });
    });
});

module.exports = router;
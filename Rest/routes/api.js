const express = require('express');

//Schema Imports
const Vendor = require('../models/vendors');
const Item = require('../models/items');
const Customer = require('../models/customers');
const Salt = require('../models/salts')
const Geo = require('../models/geoSchema');

//Tools imports
const algo = require('../tools/saltAlgo')

const router = express.Router();

//Requests for Vendors
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

router.get('/exists/vendor/:creatorId', function(request, response, next) {
    Vendor.findOne({_creatorId:request.params.creatorId}).then(function(vendor) {
        if (vendor != null)
            response.send({"answer": true});
        else
            response.send({"answer": false});
    }).catch(next);
});

router.post('/vendors', function(request, response, next) {
    
    var salt = algo.randomSalt(16);
    var hash = algo.sha512(request.body.password, salt);
    var saltUser = {
        "email":request.body.email,
        "salt":hash.salt
    }

    var newVendor = request.body;
    newVendor.password = hash.passwordHash;

    Vendor.create(newVendor).then(function(vendor) {
        Salt.create(saltUser).then(function(mySalt) {
            console.log("Success: \n" + "Salt: " + mySalt + " created.");
            response.send(vendor);
        });
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


//Requests for Items
router.get('/items/:id', function(request, response, next) {
    Item.findOne({_id:request.params.id}).then(function(item) {
        response.send(item);
    });
});

router.post('/items', function(request, response, next) {
    Vendor.findOne({_creatorId:request.body._creator}).then(function(vendor) {
        Item.create(request.body).then(function(item) {
            vendor.items.push(item);
            vendor.save(function() {
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

//Requests for Customers
router.post('/customers', function(request, response, next) {
    var salt = algo.randomSalt(16);
    var hash = algo.sha512(request.body.password, salt);
    var saltUser = {
        "email":request.body.email,
        "salt":hash.salt
    }

    var newCustomer = request.body;
    newCustomer.password = hash.passwordHash;

    Customer.create(newCustomer).then(function(customer) {
        Salt.create(saltUser).then(function(mySalt) {
            console.log("Success: \n" + "Salt: " + mySalt + " created.");
            response.send(customer);
        });
    }).catch(next);
});

module.exports = router;
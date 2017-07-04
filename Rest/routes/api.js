//External node packages
const express = require('express'),
      crypto = require('crypto'),
      multer = require('multer'),
      fs = require('fs');

//Schema Imports
      Vendor = require('../models/vendors'),
      Item = require('../models/items'),
      Customer = require('../models/customers'),
      Salt = require('../models/salts'),
      Geo = require('../models/geoSchema'),
      Token = require('../models/tokens'),
      Sale = require('../models/sales'),
      Order = require('../models/orders'),
      Image = require('../models/images'),

//Internal tools imports
      algo = require('../tools/saltAlgo'),
      token = require('../tools/generateToken');
      fileTool = require('../tools/fileTool');

const router = express.Router();

//Request for Login
router.post('/login', function(request, response, next) {
    Vendor.findOne({email:request.body.email}).then(function(vendor) {
        if(vendor != null) {
            Salt.findOne({email:vendor.email}).then(function(salt) {
                console.log("Verifying login credentials...\n");
                console.log("Testing salt: " + salt.salt + " against password: " + request.body.password);
                var enteredPasswordHash = algo.sha512(request.body.password, salt.salt);
                console.log("Hash created from password entry: " + enteredPasswordHash.passwordHash);
                console.log("Actual Hash: " + vendor.password);
                if(vendor.password === enteredPasswordHash.passwordHash)
                    token.generateToken(vendor.email, response);
                else
                    response.send({"token":"null"});
            });
        }
        else {
            Customer.findOne({email:request.body.email}).then(function(customer) {
                if(customer != null) {
                    Salt.findOne({email:customer.email}).then(function(salt) {
                        console.log("Verifying login credentials... \n");
                        console.log("Testing salt: " + salt.salt + " against password: " + request.body.password);
                        var enteredPasswordHash = algo.sha512(request.body.password,salt);
                        console.log("Hash created from password entry: " + enteredPasswordHash.passwordHash);
                        console.log("Actual Hash: " + vendor.password);
                        if(this.customer.password === enteredPasswordHash)
                            token.generateToken(customer.email, response)
                        else
                            response.send({"token":"null"});
                    });
                }
                else
                    response.send({"token":"null"});
            });
        }
    }).catch(next)
});

//-------------------------------------------------------------------------------------------------

//Requests for Vendors
router.get('/vendors', function(request, response, next) {
    Vendor.geoNear(
        {type: "Point",
         coordinates: [parseFloat(request.query.lng),parseFloat(request.query.lat)]},
        {maxDistance: 24145,
         spherical: true}
    ).then(function(vendor) {
        response.send(vendor)
    }).catch(next);
});

router.get('/vendor/:id', function(request, response, next) {
    Vendor.findOne({_id:request.params.id}).then(function(vendor) {
        var vendorSent = vendor;
        delete vendorSent.password;
        delete vendorSent.geometry;
        console.log("\n\n\nSending vendor: " + vendor + ".\n\n\n\n\n\n");
        response.send(vendorSent);
    }).catch(next);
});

router.get('/exists/vendor/:creatorId', function(request, response, next) {
    Vendor.findOne({_creatorId:request.params.creatorId}).then(function(vendor) {
        if (vendor != null)
            response.send({"answer": true});
        else
            response.send({"answer": false});
    }).catch(next);
});

router.get('/vendor/creator/:creatorId', function(request, response, next) {
    console.log(request.params.creatorId);
    Vendor.findOne({_creatorId:request.params.creatorId}).then(function(vendor) {
        console.log(vendor);
        var vendorSent = vendor;
        delete vendorSent.password;
        delete vendorSent.geometry;
        console.log("Sending vendor: " + vendor);
        response.send(vendorSent);
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
    }).catch(next);
});

//-------------------------------------------------------------------------------------------------

//Requests for Items
router.get('/items/:id', function(request, response, next) {
    Item.findOne({_id:request.params.id}).then(function(item) {
        response.send(item);
    }).catch(next);
});

router.post('/items', function(request, response, next) {
    Vendor.findOne({_creatorId:request.body._creator}).then(function(vendor) {
        Item.create(request.body).then(function(item) {
            console.log(vendor);
            vendor.items.push(item);
            vendor.save(function() {
                response.send(item._id);
            });
        });
    }).catch(next);
});

router.delete('/items/:id', function(request, response, next) {
    Item.findByIdAndRemove({_id:request.params.id}).then(function() {
        response.send(item);
    }).catch(next);
});

router.put('/items/:id', function(request, response, next) {
    Item.findByIdAndUpdate({_id:request.params.id}, request.body).then(function() {
        response.send({"success":"Item details have been changed."})
    }).catch(next);
});

//-------------------------------------------------------------------------------------------------

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

//-------------------------------------------------------------------------------------------------

//Requests for Tokens
router.get('/token_confirm/:token', function(request, response, next) {
    Token.findOne({token:request.params.token}).then(function(token) {
        if(token == null)
            response.send({"error":"No such token"})
        else {
            Vendor.findOne({email:token.email}).then(function(vendor) {
                if(vendor == null) {
                    Customer.findOne({email:token.email}).then(function(customer) {
                        response.send(customer);
                    });
                }
                else {
                    response.send(vendor);
                }
            });
        }
    }).catch(next);
});

//-------------------------------------------------------------------------------------------------

//Requests for Sales
router.post('/sales', function(request, response, next) {
    Sale.create(request.body).then(function(sale) {
        console.log("Sale:\n" + sale + "\nmade.");
        response.send({"response":"Success, sale made."});
    }).catch(next);
});

router.get('/sales/:id', function(request, response, next) {
    Sale.findOne({_id:request.params.id}).then(function(sale) {
        response.send(sale);
    }).catch(next);
});

//-------------------------------------------------------------------------------------------------

//Requests for Orders
router.get('/orders/:creatorId', function(request, response, next) {
    Order.find({_creator:request.params.creatorId}).then(function(orders) {
        response.send(orders);
    }).catch(next);
});

router.post('/orders', function(request, response, next) {
    Order.create(request.body).then(function(order) {
        console.log("Order:\n" + order + " made.\n\n");
        console.log("Expires: " + order.deliveryDate);
        response.send({"response":"Success, order made."});
    }).catch(next);
});

//-------------------------------------------------------------------------------------------------

//Requests for Images

router.get('/images/:item', function(request, response, next) {
    Image.findOne({_item:request.params.item}).then(function(image) {
        console.log("Sending data for item: " + request.params.item);
        var data = image.img.data.toString('base64');
        response.send(data);
    }).catch(next);
});

router.post('/images/:item', function(request, response) {

    var newImg = new Image();

    newImg.img.data = request.files[0].buffer.toString('base64');
    newImg.img.contentType = 'image/png';
    newImg._item = request.params.item;
    newImg.save();
    response.send("Success");

});


module.exports = router;
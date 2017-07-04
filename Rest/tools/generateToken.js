const Token = require('../models/tokens');

const token = {
    generateToken: function(email, response) {
        var gen = Math.floor((Math.random() * 100000000) + 1).toString();
        Token.findOne({"token":gen}).then(function(token) {
            if(token != null)
                generateToken(email, response);
            else {
                Token.create({"email":email,"token":gen})
                    .then(function(token) {
                        response.send(token);
                        console.log("Token Created: \n" + token);
                    });
            }
        });
    }
}

module.exports = token;
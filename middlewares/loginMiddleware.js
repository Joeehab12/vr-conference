module.exports = function(req,res,next){
    var admin = require('../models/db');
    var firebase = require('../models/config');
    var customToken = req.body.token || req.query.token || req.headers['token'];
    var token;
    if (customToken){
        firebase.auth().signInWithCustomToken(customToken).then(function(){
            firebase.auth().currentUser.getIdToken(true).then(function(idToken){
                admin.auth().verifyIdToken(idToken)
                .then(function(decodedToken) {
                    var uid = decodedToken.uid;
                    next();
                }).catch(function(error) {
                    // Handle error
                    res.json({status: "failed",message: "Failed to verify token." + error})
                });
            });
        });
    }
    else{
        res.json({status: "failed",message: "No token provided."});
    }
}

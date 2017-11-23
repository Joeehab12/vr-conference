module.exports.register = function(req,res,next){
    var admin = require('../models/db.js');
    var db = admin.database();
    var ref = db.ref('users');
    res.setHeader("Access-Control-Allow-Origin","*");
    admin.auth().createUser({
        email: req.body.email /*+ "@vrconference.com"*/,
        password: req.body.password,
        displayName: req.body.username,
    })
    .then(function(userRecord) {
        userRef.set({
            uid: userRecord.uid,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            type: req.body.type
        });
        // See the UserRecord reference doc for the contents of userRecord.
        res.json({status:"Success",message: "Successfully created new user:"+ req.body.email});
    })
    .catch(function(error) {
        res.json({status: "Failed",message: "Error creating new user:" + error});
    });
    var userRef = ref.push();


}

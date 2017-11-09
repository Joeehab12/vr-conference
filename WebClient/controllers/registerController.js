module.exports.register = function(req,res,next){
    var admin = require('../models/db.js');
    var db = admin.database();
    var ref = db.ref('users');
    admin.auth().createUser({
        email: req.body.username + "@vrconference.com",
        password: req.body.password,
        displayName: req.body.username,
    })
    .then(function(userRecord) {
        userRef.set({
            uid: userRecord.uid,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            type: req.body.type
        });
        // See the UserRecord reference doc for the contents of userRecord.
        res.json({status:"Success",message: "Successfully created new user:"+ userRecord.uid});
    })
    .catch(function(error) {
        res.json({status: "Failed",message: "Error creating new user:" + error});
    });
    var userRef = ref.push();


}

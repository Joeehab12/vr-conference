module.exports.login = function(req,res,next){
    var firebase = require ('../models/config');
    var admin = require('../models/db');
    var db = admin.database();
    var ref = db.ref('users');

    firebase.auth().signInWithEmailAndPassword(req.body.username + "@vrconference.com",req.body.password).then(function(){
        ref.orderByChild("username").equalTo(req.body.username).on("child_added", function(snapshot) {
            var data = snapshot.val();
            if (!data){
                res.status(200).json({status: "failed",message: "User not found."});
            }
            var uid = data.uid;
            admin.auth().createCustomToken(uid)
            .then(function(customToken) {
                res.json({status:"Success",message: "Enjoy your Token :)",token: customToken});
            })
            .catch(function(error) {
                res.json({status:"Failed", message: "Inavlid username or password."});
            });
        });
    }).catch(function(err){
        res.json({status:"Failed", message: "Inavlid username or password."});
    });



}

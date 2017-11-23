module.exports.login = function(req,res,next){
    var firebase = require ('../models/config');
    var admin = require('../models/db');
    var db = admin.database();
    var ref = db.ref('users');
    res.setHeader("Access-Control-Allow-Origin","*");
    firebase.auth().signInWithEmailAndPassword(req.body.email/* + "@vrconference.com"*/,req.body.password).then(function(){
        ref.orderByChild("email").equalTo(req.body.email).on("child_added", function(snapshot) {
            var data = snapshot.val();
            if (!data){
                res.status(200).json({status: "Failed",message: "User not found."});
            }
            console.log(data);
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

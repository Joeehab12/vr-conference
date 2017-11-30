module.exports.booths = function(req,res,next){
var firebase = require ('../models/config');
var admin = require('../models/db');
var db = admin.database();
var ref = db.ref('conferences');
var boothsRef = db.ref("conferences/0/booths/");

res.setHeader("Access-Control-Allow-Origin","*");
boothsRef.once("value", function(snapshot) {
//    console.log(snapshot);

    res.status(200).json(snapshot.val());
}, function (errorObject) {
  res.status(404).json({status:"failed",message:"Failed to retrieve data from database."});
});
}

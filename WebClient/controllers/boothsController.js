module.exports.booths = function(req,res,next){
var firebase = require ('../models/config');
var admin = require('../models/db');
var db = admin.database();
var ref = db.ref('conferences');
var boothsRef = ref.child("conferences/booths");

var response = [];
ref.on("value", function(snapshot) {
//    console.log(snapshot);
    snapshot.forEach(function(item){
        item.val().booths.forEach(function(booth){
                response.push(booth);
        });
    });

    res.status(200).json(response);
}, function (errorObject) {
  res.status(404).json({status:"failed",message:"Failed to retrieve data from database."});
});
}

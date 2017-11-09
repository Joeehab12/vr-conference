module.exports.booth = function(req,res,next){
var firebase = require ('../models/config');
var admin = require('../models/db');
var db = admin.database();
var ref = db.ref('booths');

ref.on("value", function(snapshot) {
  res.status(200).json(snapshot.val());
}, function (errorObject) {
  res.status(404).json({status:"failed",message:"Failed to retrieve data from database."});
});
}

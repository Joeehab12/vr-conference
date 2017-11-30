module.exports.conferenceId = function(req,res,next){
var firebase = require ('../models/config');
var admin = require('../models/db');
var db = admin.database();
var ref = db.ref('conferences');
var id = req.params.id;
ref.orderByChild("id").equalTo(id).once("value", function(snapshot) {
 // console.log(snapshot.val());
  res.status(200).json(snapshot.val());
}, function (errorObject) {
  res.status(404).json({status:"failed",message:"Failed to retrieve data from database."});
});
}

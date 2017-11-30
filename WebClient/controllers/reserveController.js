module.exports.reserve = function(req,res,next){
    var firebase = require ('../models/config');
    var admin = require('../models/db');
    var db = admin.database();
    var ref = db.ref('conferences/'+req.body.conferenceId+'/booths');
    ref.child(req.body.boothId).update({reserved: "true"});
    res.setHeader("Access-Control-Allow-Origin","*");
    res.json({status: "success",message:"booth reserved successfully"});

}

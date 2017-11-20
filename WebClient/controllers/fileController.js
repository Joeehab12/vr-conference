module.exports.file = function(req,res,next){
    var http = require('http');
    var fs = require('fs');
    var request = require('request');
    var firebase = require ('../models/config');
    var admin = require('../models/db');
    var db = admin.database();
    var ref = db.ref('booths');
    var file_name = req.file;
    //var file = fs.createWriteStream("file.jpg");

    var tmp_path = req.file.path;
    var target_path = "./vr-conference-frontend/public/assets/" + req.file.originalname;
    /** A better way to copy the uploaded file. **/
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({status: "success",message:"file uploaded successfully"});
    // Or with cookies
    // var request = require('request').defaults({jar: true});

}

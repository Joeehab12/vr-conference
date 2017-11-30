module.exports.file = function(req,res,next){
    var http = require('http');
    var fs = require('fs');
    var request = require('request');
    var firebase = require ('../models/config');
    var admin = require('../models/db');
    var db = admin.database();
    var ref = db.ref('conferences/'+req.body.id+'/booths');
    var file_name = req.file;
    //var file = fs.createWriteStream("file.jpg");

    var tmp_path = req.file.path;
    var target_path = "./vr-conference-frontend/public/assets/" + req.file.originalname;
    /** A better way to copy the uploaded file. **/
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    res.setHeader('Access-Control-Allow-Origin', '*');
    //console.log(req.body);
    var locations_map = {
        "A": "0",
        "B": "1",
        "C": "2",
        "D": "3",
        "E": "4",
        "F": "5"
    }
    var index = req.body.location;
    if (req.body.file_type == "banner_image"){
        ref.child(locations_map[index]).update({banner : "http://localhost:8000/" + req.file.originalname});
    }
    else if (req.body.file_type == "document"){
        ref.child(locations_map[index]).update({document : "http://localhost:8000/" + req.file.originalname});
    }
    else if (req.body.file_type == "video"){
        ref.child(locations_map[index]).update({video : "http://localhost:8000/" + req.file.originalname});
    }
    else if (req.body.file_type == "inner_graphics"){
        ref.child(locations_map[index]).update({inner_graphics : "http://localhost:8000/" + req.file.originalname});
    }
    else{
        ref.child(locations_map[index]).update({outer_graphics : "http://localhost:8000/" + req.file.originalname});
    }
    console.log(index);
    ref.child(locations_map[index]).update({reserved: "true"});


    res.json({status: "success",message:"file uploaded successfully"});

    // Or with cookies
    // var request = require('request').defaults({jar: true});

}

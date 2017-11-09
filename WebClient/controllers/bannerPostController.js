module.exports.bannerPost = function(req,res,next){
var http = require('http');
var fs = require('fs');
var request = require('request');
var firebase = require ('../models/config');
var admin = require('../models/db');
var db = admin.database();
var ref = db.ref('booths');

// Or with cookies
// var request = require('request').defaults({jar: true});
console.log("outside request.");
var ext;
if (req.body.url){
 ext = req.body.url.substring("data:image/".length, req.body.url.indexOf(";base64"))
}
request.get({url: req.body.url, encoding: 'base64'}, function (err, response, body) {
  // our data URL string from canvas.toDataUrl();
var imageDataUrl = req.body.url;
// declare a regexp to match the non base64 first characters
var dataUrlRegExp = /^data:image\/\w+;base64,/;
// remove the "header" of the data URL via the regexp
var base64Data = imageDataUrl.replace(dataUrlRegExp, "");
// declare a binary buffer to hold decoded base64 data
var imageBuffer = new Buffer(base64Data, "base64");
// write the buffer to the local file system synchronously
fs.writeFileSync("./vr-conference-frontend/public/assets/"+req.body.id+'.'+ext, imageBuffer);

});
var boothsRef = ref.child(req.body.id);
boothsRef.update({
  "banner": "http://localhost:8000/" + req.body.id + '.' + ext
}).then(function(){
    res.status(200).json({status: "success",message:"Image Uploaded Successfully."});
}).catch(function(err){
    res.status(200).json({status: "failed",message:"Failed to Upload Image."})
});

}

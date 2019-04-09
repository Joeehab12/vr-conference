module.exports.email = function(req,res,next){
    var firebase = require ('../models/config');
    var admin = require('../models/db');
    var db = admin.database();
    var ref = db.ref('users');
    var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'noreply.vrconference@gmail.com',
    pass: 'securepassword'
  }
});

var mailOptions = {
  from: 'VR Conference <noreply.vrconference@gmail.com>',
  to: req.body.destinationEmail,
  attachments:[{filename: req.body.path.substring(req.body.path.lastIndexOf('/')+1),path: req.body.path }],
  subject: '[Booth '+ req.body.location+ ' Documents]',
  text: 'Dear User:\n\n Kindly find attached your registered booth documents in PDF format.\n\n\n Sincerely,\n VR Conference Team'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    res.json({status:"failed" , message: error});
  } else {
    res.json({status:"success" , message: "Email sent. " + info.response});
  }
});



}

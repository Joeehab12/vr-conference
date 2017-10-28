var admin = require("firebase-admin");
var serviceAccount = require("../vr-conference-firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://vr-conference.firebaseio.com/"
});

var db = admin.database();
//var ref = db.ref("users");


module.exports = admin;

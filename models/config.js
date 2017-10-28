var firebase = require('firebase');
const config = {
    apiKey: "AIzaSyB7iyTNlZJTqqVpEqjMMbchZ-9iqCComrw",
    databaseURL: "https://vr-conference.firebaseio.com/"
};
firebase.initializeApp(config);

module.exports = firebase;

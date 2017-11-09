var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: "50mb",extended: true }))
app.use(bodyParser.json({limit: "50mb"}));

require('./models/db');

var port = 8000;
app.use(express.static(__dirname + '/vr-conference-frontend/public/assets'));
require('./routes/routes.js')(app);

app.listen(port,function(){
    console.log('Server listening on port: ' + port + '...');
});

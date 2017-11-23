var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ limit: "50mb",extended: true }))
app.use(bodyParser.json({limit: "50mb"}));

var port = 8080;
app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res,next){
    res.sendFile("/login.html",{root: __dirname + '/public'});
});

app.get('/register',function(req,res,next){
    res.sendFile("/register.html",{root: __dirname + '/public'});
});

app.get('/content',function(req,res,next){
    res.sendFile("/content.html",{root: __dirname + '/public'});
});

app.get('/visitor',function(req,res,next){
    res.sendFile("/visitor.html",{root: __dirname + '/public'});
});


app.listen(port,function(){
    console.log('Server listening on port: ' + port + '...');
});

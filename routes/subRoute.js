module.exports = function(app){
var loginController = require('../controllers/loginController.js');
var regiserController = require('../controllers/registerController.js');
var loginMiddleware = require('../middlewares/loginMiddleware.js');


app.post('/login',loginController.login);
app.post('/register',regiserController.register);
app.use(loginMiddleware);
app.post('/',function(){
    console.log({message:"empty route"});
});
}

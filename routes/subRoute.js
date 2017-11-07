module.exports = function(app){
var loginController = require('../controllers/loginController.js');
var registerController = require('../controllers/registerController.js');
var loginMiddleware = require('../middlewares/loginMiddleware.js');


app.post('/login',loginController.login);
app.post('/register',registerController.register);
app.use(loginMiddleware);

}

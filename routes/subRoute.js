module.exports = function(app){
var loginController = require('../controllers/loginController.js');
var registerController = require('../controllers/registerController.js');
var bannerPostController = require('../controllers/bannerPostController.js');
var boothController = require('../controllers/boothController.js');
var loginMiddleware = require('../middlewares/loginMiddleware.js');


app.post('/login',loginController.login);
app.post('/register',registerController.register);
app.use(loginMiddleware);
app.post('/upload/banner',bannerPostController.bannerPost);
app.get('/booths',boothController.booth);
}

module.exports = function(app){
    var multer  = require('multer');
    var upload = multer({ dest: 'uploads/' });
    var loginController = require('../controllers/loginController.js');
    var registerController = require('../controllers/registerController.js');
    var bannerPostController = require('../controllers/bannerPostController.js');
    var conferenceController = require('../controllers/conferenceController.js');
    var conferenceIdController = require('../controllers/conferenceIdController.js');
    var videoController = require('../controllers/videoController.js')
    var boothsController = require('../controllers/boothsController.js');
    var loginMiddleware = require('../middlewares/loginMiddleware.js');

    app.post('/login',loginController.login);
    app.post('/register',registerController.register);
    app.use(loginMiddleware);
    app.post('/upload/banner',bannerPostController.bannerPost);
    app.get('/booths',boothsController.booths);
    app.get('/conferences',conferenceController.conferences);
    app.get('/conferences/:id',conferenceIdController.conferenceId);
    app.post('/video',upload.single('video_file'),videoController.video);
}

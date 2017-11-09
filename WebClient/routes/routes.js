module.exports = function(app){
    require('./subRoute.js')(app);

    app.use(function(req,res,next){
        res.status(404).json({
            status: "Failed",
            message: "The requested route is not found."
        });
    });
}

function log(req, res, next) {//custom Middleware funtion
    console.log("Logging....");
    next();
}
module.exports = log;
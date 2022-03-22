module.exports = function(req, res, next){
    res.set('Access-Control-Allow-Origin', '*');
    next();
}
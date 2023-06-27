module.exports = {
    ensureAutheticated: function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_message', 'Please login first!');
        res.redirect('/login');
    },
    ensureNotAutheticated: function(req,res,next){
        if(req.isAuthenticated()){
            return res.redirect('/');
        }
        next();
    },
    ensureIsAutheticated: function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/login');
    },
}
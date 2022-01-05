var middlewareObj = {};
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
    	return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/");
}
middlewareObj.isLoggedIn_aries = function(req, res, next){
    if(req.isAuthenticated()){
    	if(req.user.username==="aries"){
    		return next();
    	}
        req.flash("error", "You need to be authenticated to do that");
        res.redirect("back");
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/");
}
middlewareObj.isLoggedIn_kalyanji = function(req, res, next){
    if(req.isAuthenticated()){
    	if(req.user.username==="kalyanji"){
    		return next();
    	}
        req.flash("error", "You need to be authenticated to do that");
        res.redirect("back");
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/");
}

module.exports = middlewareObj;
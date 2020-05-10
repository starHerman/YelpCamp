var express=require("express");
var router=express.Router();
var User=require("../models/user");
var passport=require("passport");
router.get('/',function(req,res){
	res.render("landing");
});



//show register form
router.get("/register",function(req,res){
	res.render("register");
});
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/campground"); 
        });
    });
});

router.post("/login",passport.authenticate("local",
{
	successRedirect:"/campground",
	failureRedirect:"/login"
}),function(req,res){
	
});

router.get("/login",function(req,res){
	res.render("login")
});

router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/campground");
});

function isLoggerIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}
module.exports=router;
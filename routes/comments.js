var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comment");
router.get("/campground/:id/comments/new",isLoggerIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}
		else{
			res.render("comments/new",{campground:campground});
		}
		
	});
router.post("/campground/:id/comments",isLoggerIn,function(req,res){
	
		Campground.findById(req.params.id,function(err,campground){
			if(err){
				console.log(err);
			}else{
				Comment.create(req.body.comment,function(err,comment){
					if(err){
						console.log(err);
					}
					else{
comment.author.id=req.user._id;
comment.author.username=req.user.username;
comment.save();						campground.comments.push(comment);
						campground.save();
						res.redirect("/campground/"+campground._id);
					}
				});
			}
			
		});
	
});
	
			
});
function isLoggerIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}
module.exports=router;
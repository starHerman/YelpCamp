var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comment");
router.get("/campground",function(req,res){
	
	Campground.find({},function(error,allCampgrounds){
	if(error){
		console.log(error);
	}
	else{
		console.log("All campgrounds");
		res.render("campgrounds/index",{campgrounds:allCampgrounds});
	}
});
	
	
	
});
router.post("/campground",isLoggerIn,function(req,res){
	//get data from form and add to camp.ground array
	//redirect to the campgroud page
	var name=req.body.name;
	var image=req.body.image;
	var description=req.body.description;
	var author={
		id:req.user._id,
		username:req.user.username
	};
	var newCampground={name:name,image:image,description:description,author:author};
	//create a new campground and save
	Campground.create(newCampground,function(error,campground){
		if(error){
			console.log(error);
		}
		else{
			res.redirect("/campground");
		}
	});
	
});
router.get("/campground/new",isLoggerIn,function(req,res){
	res.render("campgrounds/new.ejs");
});
//Show more infor
router.get("/campground/:id",function(req,res){
	//find the campground with the provided ID
	//render the show page
	Campground.findById(req.params.id).populate("comments").exec(function(error,foundCampground){
		if(error){
			console.log(error);
		}
		else{
			console.log(foundCampground);
				res.render("campgrounds/show",{campground:foundCampground});
		}
	});

	
});
function isLoggerIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports=router;

var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")
var CommentsRoutes=require("./routes/comments");  
var CampgroundRoutes=require("./routes/campground");  
var IndexRoutes=require("./routes/index");  
mongoose.connect("mongodb://localhost/yelp_camp_v6");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	next();
});
// var campgrounds=[{name:"Salmon Greek",image:"https://images.unsplash.com/photo-1465408687720-1d566d7753ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},{name:"Grantite Hill",image:"https://images.unsplash.com/photo-1465408687720-1d566d7753ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},{name:"Mountain Goat",image:"https://images.unsplash.com/photo-1494545261862-dadfb7e1c13d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},{name:"Salmon Greek",image:"https://images.unsplash.com/photo-1494545261862-dadfb7e1c13d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},{name:"Salmon Greek",image:"https://images.unsplash.com/photo-1496947850313-7743325fa58c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},{name:"Salmon Greek",image:"https://images.unsplash.com/photo-1496947850313-7743325fa58c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},{name:"Salmon Greek",image:"https://images.unsplash.com/photo-1496947850313-7743325fa58c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"}];
//Schema Setup
// var campgroundSchema=new mongoose.Schema({name:String,image:String,description:String});
// var Campground=mongoose.model("Campground",campgroundSchema);
// Campground.create(
// 					{name:"Mountain Goat",image:"https://images.unsplash.com/photo-1494545261862-dadfb7e1c13d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",description:"This is a huge Mountain, no bathroom, no water . Very Beautiful"},function(error,campground){
// 		if(error){
// 			console.log(error);
// 		}
// 	else{
// 			console.log("Newly Created Campground");
// 			console.log(campground);
// 	}
// });

// Campground.find({},function(error,campground){
// 	if(error){
// 		console.log(error);
// 	}
// 	else{
// 		console.log("All campgrounds");
// 		console.log(campgrounds);
// 	}
// });
app.use(IndexRoutes);
app.use(CampgroundRoutes);
app.use(CommentsRoutes);



app.listen(3000,function(){
	console.log('The YelpCamp Server Has Started!');
});
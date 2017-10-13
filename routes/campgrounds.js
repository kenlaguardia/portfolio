var express = require("express"),
router 	= express.Router();
var Campground = require("../models/campground");
var middlewareObj = require("../middleware");

router.get("/", function (req, res) {
	Campground.find({}, function(err, allCampgrounds){
		if (err) {
			console.log(err);
		} else{
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		};
	});
});

// Create a new Campground 
router.post("/", middlewareObj.isLoggedIn, function (req, res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {name: name, image: image, description: description, author: author};
	// Create a new campground and save to DB
	Campground.create(newCampground, function (err, newlyCreated) {
		if (err) {
			console.log(err);
		} else{
			// redirect to the campgrounds
			req.flash("success", "Successfully Created a new Campground");
			res.redirect("campgrounds");
		};
	});
});

// show the Form
router.get("/new", middlewareObj.isLoggedIn, function (req, res) {
	res.render("./campgrounds/new");
});

// Show more info about campgrounds
router.get("/:id", function (req, res) {
	Campground.findById(req.params.id).populate("comments").exec( function (err, foundCampground) {
		if (err) {
			console.log(err);
		} else{
			res.render("campgrounds/show", {campground: foundCampground});
		};
	});
});


// Edit Campgrounds
router.get("/:id/edit", middlewareObj.checkUser, function (req, res) {
	Campground.findById(req.params.id, function (err, foundCampground) {
		res.render("./campgrounds/edit", {campground: foundCampground});
	});
});

// Update Campgrounds
router.put("/:id", middlewareObj.checkUser, function (req, res) {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
		if (err) {
			res.redirect("/campgrounds");
		} else{
			req.flash("success", "Successfully updated a Campground");
			res.redirect("/campgrounds/" + req.params.id);
		};
	});
});

// Destroy Route
router.delete("/:id", middlewareObj.checkUser, function (req, res) {
	Campground.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			req.flash("success", "Ops something went wrong");
			res.redirect("/campgrounds");
		} else{
			req.flash("success", "Successfully delete Campground");
			res.redirect("/campgrounds");
		};
	});
});

module.exports = router;
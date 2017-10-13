var express = require("express"),
router 	= express.Router(),
passport = require("passport"),
User = require("../models/user");

// route
router.get("/", function (req, res) {
	res.render("landing");
});

// AUTH ROUTES
router.get("/register", function (req, res) {
	res.render("register");
});

router.post("/register", function (req, res) {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function (err, user) {
		if (err) {
			req.flash("error", err.message);
			// req.flash("messages", { "error" : err.message });
			res.redirect("/register");
		} else {
			passport.authenticate("local")(req,res, function () {
				req.flash("success", "Welcome to the yelpcamp " + user.username);
				res.redirect("/campgrounds")
			});
		};
	});
});

// Login Route
router.get("/login", function (req, res) {
	res.render("login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login",
	failureFlash : true
}),function (req, res) {
	
});

// Logout
router.get("/logout", function (req, res) {
	req.logout();
	req.flash("success", "Successfully logged out");
	res.redirect("/campgrounds");
});

module.exports = router;
var express = require("express"),
router 	= express.Router(),
passport = require("passport"),
User = require("../models/user");
var Portfolio = require("../models/portfolio");
var middlewareObj = require("../middleware");
// route
router.get("/", function (req, res) {
	Portfolio.find({}, function(err, allPortfolios){
		if (err) {
			console.log(err);
		} else{
			res.render("landing", {portfolios: allPortfolios});
		};
	});
});
// AUTH ROUTES
// router.get("/register", function (req, res) {
// 	res.render("register");
// });

// router.post("/register", function (req, res) {
// 	var newUser = new User({username: req.body.username});
// 	User.register(newUser, req.body.password, function (err, user) {
// 		if (err) {
// 			req.flash("error", err.message);
// 			// req.flash("messages", { "error" : err.message });
// 			res.redirect("/register");
// 		} else {
// 			passport.authenticate("local")(req,res, function () {
// 				req.flash("success", "Welcome to the Secret page " + user.username);
// 				res.redirect("/")
// 			});
// 		};
// 	});
// });

// Login Route
router.get("/login", function (req, res) {
	res.render("login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login",
	failureFlash : true
}),function (req, res) {
	
});

// Logout
router.get("/logout", function (req, res) {
	req.logout();
	req.flash("success", "Successfully logged out");
	res.redirect("/");
});


module.exports = router;
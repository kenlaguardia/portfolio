var express = require("express"),
router 	= express.Router();
var Portfolio = require("../models/portfolio");
var middlewareObj = require("../middleware");
var expressSanitizer= require("express-sanitizer");

router.get("/", function (req, res) {
	Portfolio.find({}, function(err, allPortfolios){
		if (err) {
			console.log(err);
		} else{
			res.render("portfolios/index", {portfolios: allPortfolios});
		};
	});
});

// Create a new Portfolio 
router.post("/", middlewareObj.isLoggedIn, function (req, res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var projectdate = req.body.date;
	var coffee = req.body.coffee;
	var tags = req.body.tags;
	var siteurl = req.body.siteurl;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	description = req.sanitize(description);
	var newPortfolio = {name: name, image: image, description: description, author: author, projectdate:projectdate, coffee:coffee, tags:tags,siteurl:siteurl};
	// Create a new Portfolio and save to DB
	Portfolio.create(newPortfolio, function (err, newlyCreated) {
		if (err) {
			console.log(err);
		} else{
			// redirect to the portfolio
			req.flash("success", "Successfully Created a new Portfolio");
			res.redirect("portfolios");
		};
	});
});

// show the Form
router.get("/new", middlewareObj.isLoggedIn, function (req, res) {
	res.render("./portfolios/new");
});

// Show more info about portfolio
router.get("/:id", function (req, res) {
	Portfolio.findById(req.params.id).populate("comments").exec( function (err, foundPortfolio) {
		if (err) {
			console.log(err);
		} else{
			res.render("portfolios/show", {portfolio: foundPortfolio});
		};
	});
});


// Edit Portfolio
router.get("/:id/edit", middlewareObj.checkUser, function (req, res) {
	Portfolio.findById(req.params.id, function (err, foundPortfolio) {
		res.render("./portfolios/edit", {portfolio: foundPortfolio});
	});
});

// Update Portfolio
router.put("/:id", middlewareObj.checkUser, function (req, res) {
	req.body.portfolio.description = req.sanitize(req.body.portfolio.description);
	Portfolio.findByIdAndUpdate(req.params.id, req.body.portfolio, function (err, updatedPortfolio) {
		if (err) {
			res.redirect("/portfolios");
		} else{
			req.flash("success", "Successfully updated a Portfolio");
			res.redirect("/portfolios/" + req.params.id);
		};
	});
});

// Destroy Route
router.delete("/:id", middlewareObj.checkUser, function (req, res) {
	Portfolio.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			req.flash("success", "Ops something went wrong");
			res.redirect("/portfolios");
		} else{
			req.flash("success", "Successfully delete Portfolio");
			res.redirect("/portfolios");
		};
	});
});

module.exports = router;
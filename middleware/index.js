var Portfolio = require("../models/portfolio");
var Comment = require("../models/comment");
var middlewareObj = {};

// Check User 
middlewareObj.checkUser = function (req, res, next) {
	if (req.isAuthenticated()) {
		Portfolio.findById(req.params.id, function (err, foundPortfolio) {
			if (err) {
				res.redirect("/portfolios");
			} else{
				if (foundPortfolio.author.id.equals(req.user._id)) {
					next();
				} else{
					req.flash("error", "You dont have permission to do that!");
					res.redirect("back");
				};
				
			};
		});
	} else{
		res.redirect("back");
	};
};

// Is Logged In
middlewareObj.isLoggedIn = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	};
	req.flash("error", "Please login first");
	res.redirect("/login");
};

// Check User 
middlewareObj.checkUserComment  = function (req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function (err, foundComment) {
			if (err) {
				req.flash("error", "You dont have permission to do that!");
				res.redirect("/");
			} else{
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				} else{
					req.flash("error", "You dont have permission to do that!");
					res.redirect("back");
				};
				
			};
		});
	} else{
		req.flash("error", "You dont have permission to do that!");
		res.redirect("back");
	};
};


module.exports = middlewareObj;
var express = require("express"),
	router 	= express.Router({mergeParams: true});
var Portfolio = require("../models/portfolio");
var Comment = require("../models/comment");
var middlewareObj = require("../middleware");
var expressSanitizer= require("express-sanitizer");

//=============================
// Comments
//=============================
// New
router.get("/new", middlewareObj.isLoggedIn, function (req, res) {
	Portfolio.findById(req.params.id, function (err, portfolio) {
		if (err) {
			console.log(err);
		} else{
			res.render("comments/new", {portfolio: portfolio});
		};
	});
});
// Create Comment

router.post("/", middlewareObj.isLoggedIn, function (req, res) {
	Portfolio.findById(req.params.id, function (err, portfolio) {
		if (err) {
			req.flash("error", err);
			res.redirect("/portfolios");
		} else{
			req.body.comment.text = req.sanitize(req.body.comment.text);
			Comment.create(req.body.comment, function (err, comment) {
				if (err) {
					req.flash("error", err);
					res.redirect("/portfolios");
				} else{
					comment.author.username = req.user.username;
					comment.author.id = req.user._id;
					// save comment
					comment.save();
					portfolio.comments.push(comment);
					portfolio.save();
					req.flash("success", "Successfully Created a new Comment");
					res.redirect("/portfolios/" + portfolio._id);
				};
			});
		};
	});
});

// Edit
router.get("/:comment_id/edit", middlewareObj.checkUserComment, function (req, res) {
	Comment.findById(req.params.comment_id, function (err, foundComment) {
		if (err) {
			res.redirect("back");
		} else{
			res.render("comments/edit", {portfolio_id: req.params.id, comment: foundComment});
		};
	});
});

// Update
router.put("/:comment_id", middlewareObj.checkUserComment, function (req, res) {
	req.body.comment.text = req.sanitize(req.body.comment.text);
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
		if (err) {
			req.flash("error", err);
			res.redirect("back");
		} else{
			req.flash("success", "Successfully Updated Comment");
			res.redirect("/portfolios/" + req.params.id);
		};
	});
});

// Delete
router.delete("/:comment_id",middlewareObj.checkUserComment, function (req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function (err) {
		if (err) {
			res.redirect("back");
			req.flash("error", "You dont have permission to do that!");
		} else{
			res.redirect("/portfolios/" + req.params.id);
		};
	});
});

module.exports = router;
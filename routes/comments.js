var express = require("express"),
	router 	= express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = require("../middleware");

//=============================
// Comments
//=============================
// New
router.get("/new", middlewareObj.isLoggedIn, function (req, res) {
	Campground.findById(req.params.id, function (err, campground) {
		if (err) {
			console.log(err);
		} else{
			res.render("comments/new", {campground: campground});
		};
	});
});
// Create Comment

router.post("/", middlewareObj.isLoggedIn, function (req, res) {
	Campground.findById(req.params.id, function (err, campground) {
		if (err) {
			req.flash("error", err);
			res.redirect("/campgrounds");
		} else{
			Comment.create(req.body.comment, function (err, comment) {
				if (err) {
					req.flash("error", err);
					res.redirect("/campgrounds");
				} else{
					comment.author.username = req.user.username;
					comment.author.id = req.user._id;
					// save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "Successfully Created a new Comment");
					res.redirect("/campgrounds/" + campground._id);
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
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		};
	});
});

// Update
router.put("/:comment_id", middlewareObj.checkUserComment, function (req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
		if (err) {
			req.flash("error", err);
			res.redirect("back");
		} else{
			req.flash("success", "Successfully Updated Comment");
			res.redirect("/campgrounds/" + req.params.id);
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
			res.redirect("/campgrounds/" + req.params.id);
		};
	});
});

module.exports = router;
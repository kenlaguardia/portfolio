var mongoose 	= require("mongoose");
var Campground 	= require("./models/campground");
var Comment 	=require("./models/comment");

var data = [
{
	name: "Lake Varuna",
	image: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.active.com%2FAssets%2Fnh_camping.jpg&f=1",
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
},
{
	name: "Lake Rage",
	image: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.active.com%2FAssets%2Fnh_camping.jpg&f=1",
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
},
{
	name: "Lake Orea",
	image: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.active.com%2FAssets%2Fnh_camping.jpg&f=1",
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}
];

function seedDB () {
	// Remove All Campgrounds
	Campground.remove({}, function (err) {
		if (err) {
			console.log(err);
		} else{
			console.log("Removed all Campground")
			//Add Comments
			data.forEach(function (seed) {
				Campground.create(seed, function (err, campground) {
					if (err) {
						console.log(err);
					} else{
						console.log("added a campground");
						Comment.create({
							text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
							author: "Banog"
						}, function (err, comment) {
							if (err) {
								console.log(err);
							} else{
								campground.comments.push(comment);
								campground.save();
								console.log("Added Comments");

							};
						});
					};
				});
			});
		};
	});
	// Add User
};

module.exports = seedDB;
var mongoose 		= require("mongoose"),
portfolioSchema	= mongoose.Schema({
	name: String,
	image: String,
	description: String,
	projectdate: Date,
	coffee: Number,
	tags: String,
	siteurl: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
var express 		= require("express"),
  	app 			= express(),
	bodyParser 		= require("body-parser"),
	mongoose		= require("mongoose"),
	flash			=require("connect-flash"),
	passport		= require("passport"),
	localStrategy 	= require("passport-local"),
	methodOverride	= require("method-override"),
	Campground 		= require("./models/campground"),
	Comment 		= require("./models/comment"),
	User 			= require("./models/user"),
	seedDB 			= require("./seeds");

var commentRoutes 		= require("./routes/comments"),
	campgroundRoutes 	= require("./routes/campgrounds"),
	indexRoutes 		= require("./routes/index");

// seedDB(); // seed the database
mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://127.0.0.1/yelp_camp", {
mongoose.connect("mongodb://ken:laguardia@ds117605.mlab.com:17605/ken_db", {
	useMongoClient: true,
});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT AUTH
app.use(require("express-session")({
	secret: "qwerty",
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen("3000", function () {
	console.log("Server is Running");
});
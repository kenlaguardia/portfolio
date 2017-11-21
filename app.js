var express 		= require("express"),
  	app 			= express(),
	bodyParser 		= require("body-parser"),
	expressSanitizer= require("express-sanitizer"),
	mongoose		= require("mongoose"),
	flash			=require("connect-flash"),
	passport		= require("passport"),
	localStrategy 	= require("passport-local"),
	methodOverride	= require("method-override"),
	Portfolio 		= require("./models/portfolio"),
	Comment 		= require("./models/comment"),
	User 			= require("./models/user");
	// seedDB 			= require("./seeds");

// Routes variables
var commentRoutes 		= require("./routes/comments"),
	portfolioRoutes 	= require("./routes/portfolios"),
	indexRoutes 		= require("./routes/index");

// seedDB(); // seed the database
var http = require('http');

// These could (should) be set as env vars.
var port = process.env.PORT || 5000;
var host = process.env.HOST || 'localhost';
// mongodb connection
var url = process.env.DATABASEURL || "mongodb://127.0.0.1/kenlag_db";

mongoose.Promise = global.Promise;
mongoose.connect(url, {
	useMongoClient: true,
});

// App config
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
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

// global variables
app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

// Routes Import
app.use(indexRoutes);


// Routes Import
app.use("/portfolios", portfolioRoutes);
app.use("/portfolios/:id/comments", commentRoutes);
app.use(express.static('static'));
app.get('/health-check', (req,res) => res.sendStatus(200));
app.get("*", function (req, res){
	res.send("Error 404");
});
// Server Initialization
console.log(port);
console.log(host);
app.listen(port, host, function () {
	console.log("Server is Running");
});
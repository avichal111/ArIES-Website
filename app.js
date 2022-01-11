var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    // mongoose    = require("mongoose"),
    methodOverride = require("method-override"),
    flash       = require("connect-flash"),
    Message  = require("./models/message"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    // bodyParser  = require("body-parser"),
    // mongoose    = require("mongoose"),
    // flash       = require("connect-flash"),
    // passport    = require("passport"),
    // LocalStrategy = require("passport-local"),
    // methodOverride = require("method-override"),
    User        = require("./models/user")
    // Campground  = require("./models/campground")

var indexRoutes = require("./routes/index"),
    membersRoutes = require ("./routes/members")


// mongoose.connect("mongodb://localhost/ariesv1");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
var newUser = new User({username: "kalyanji"});
User.register(newUser, "aries123", function(req,err, user){
    if(err){
        req.flash("error", err.message);
        return res.render("register");
      }
});

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


app.use("/", indexRoutes);
app.use("/members", membersRoutes);






app.listen(8081, function(){
   console.log("The YelpCamp Server Has Started!");
});

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
 
    console.log("Example app listening at http://%s:%s", host, port)
 })

app.get('/aeroclub', function (req, res,html) {
    res.render('/views/landing/aeroclub.ejs');
    });
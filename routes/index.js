var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Message = require("../models/message");
var middleware = require("../middleware");

//root route
router.get("/", function(req, res){
    res.render("./landing/index");
});
router.get("/team", function(req, res){
    res.render("./landing/team");
});
router.get("/projects", function(req, res){
    res.render("./landing/projects");
});
router.get("/aeroclub", function(req, res){
    res.render("./landing/aeroclub");
});
//CREATE - add new message to DB
router.post("/submit-form",  function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;
    var message = req.body.message;
    var newMessage = {name: name, email: email, subject: subject, message:message}
    // Create a new message and save to DB
    Message.create(newMessage, function(err, newlyCreated){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            //redirect back to main page
            newlyCreated.save();
            console.log(newlyCreated);
            req.flash("success", "Message sent!");
            // console.log("njn")
            res.redirect("/");
        }
    });
});


//show login form
router.get("/login", function(req, res){
   res.render("./landing/login"); 
});
//show members page
router.get("/members",middleware.isLoggedIn, function(req, res){
   Message.find({}, function(err, allMessages){
       if(err){
           console.log(err);
       } else {
          res.render("./landing/members",{messages:allMessages });
       }
    });
});

//Verify
//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/members",
        failureRedirect: "back"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/");
});

module.exports = router;
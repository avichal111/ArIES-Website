var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Inventory = require("../models/inventory");
var Message = require("../models/message");
var middleware = require("../middleware");


//show members page
router.get("/",middleware.isLoggedIn, function(req, res){
   
    res.render("./landing/members");
       
   
});
//show messages
router.get("/messages",middleware.isLoggedIn_aries, function(req, res){
   Message.find({}, function(err, allMessages){
       if(err){
           // console.log(err);
       } else {
          res.render("./landing/messages",{messages:allMessages });
       }
    });
});

//Delete Messages
router.delete("/messages/:id",middleware.isLoggedIn_aries, function(req, res){
   Message.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/members/messages");
      } else {
          res.redirect("/members/messages");
      }
   });
});

//show inventory
router.get("/inventory",middleware.isLoggedIn, function(req, res){
	Inventory.find({}, function(err, allInventory){
       if(err){
           // console.log(err);
       } else {
          res.render("./landing/inventory",{inventory:allInventory });
       }
    });
   // res.render("./landing/inventory");
});

//show form
router.get("/inventory/new",middleware.isLoggedIn, function(req, res){
   res.render("./landing/new");
});

//CREATE - add new inventory to DB
router.post("/inventory", middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var quant = req.body.quantity;

    var newInventory = {name: name, image: image, quantity: quant}
    // Create a new campground and save to DB
    Inventory.create(newInventory, function(err, newlyCreated){
        if(err){
            // console.log(err);
            res.redirect("/members/inventory");
        } else {
            //redirect back to campgrounds page
            // console.log(newlyCreated);
            res.redirect("/members/inventory");
        }
    });
});
// SHOW - shows more info about one campground
router.get("/inventory/:id", middleware.isLoggedIn, function(req, res){
    //find the campground with provided ID
    Inventory.findById(req.params.id,function(err, foundInventory){
        if(err){
            // console.log(err);
            res.redirect("/members/inventory");
        } else {
            // console.log(foundInventory)
            //render show template with that campground
            res.render("./landing/show", {inventory: foundInventory});
        }
    });
});
// EDIT Inventory ROUTE
router.get("/inventory/:id/edit", middleware.isLoggedIn, function(req, res){
    Inventory.findById(req.params.id, function(err, foundInventory){
        res.render("./landing/edit", {inventory: foundInventory});
    });
});

// UPDATE Inventory ROUTE
router.put("/inventory/:id",middleware.isLoggedIn, function(req, res){
    // find and update the correct campground
    Inventory.findByIdAndUpdate(req.params.id, req.body.inventory, function(err, updatedCampground){
       if(err){
           res.redirect("/members/inventory");
       } else {
           //redirect somewhere(show page)
           res.redirect("/members/inventory");
       }
    });
});
//Delete inventory
router.delete("/inventory/:id",middleware.isLoggedIn_kalyanji, function(req, res){
   Inventory.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/members/inventory");
      } else {
          res.redirect("/members/inventory");
      }
   });
});


//show form for addition of takers
router.get("/inventory/:id/takers/new",middleware.isLoggedIn_kalyanji, function(req, res){
   res.render("./landing/new_takers", {id: req.params.id});
});

//Comments Create
router.post("/inventory/:id",middleware.isLoggedIn_kalyanji,function(req, res){
   //lookup campground using ID
   Inventory.findById(req.params.id, function(err, inventory){
       if(err){
           // console.log(err);
           res.redirect("/members/inventory/"+ inventory._id);
       } else {
        	taker = {};
        	taker.enr_no = req.body.enr_no;
        	taker.quantity = req.body.quantity;
          taker.mobile = req.body.mobile;
          taker.name = req.body.name;
        	// taker.save();
            inventory.takers.unshift(taker);
            inventory.save(function (err, product, numAffected) {
  						if (err){
  							console.log(err);
  							res.redirect("/members/inventory/"+ inventory._id);
  						}
  						else{
  							console.log(product);
            				console.log("bh");
               
            				res.redirect('/members/inventory/' + inventory._id);
            			}
			})
            // inventory.save();
    //         Inventory.update(
    // 				{ _id: inventory._id }, 
    // 				{ $push: { takers: taker } }
    				
				// );
            
           }
        });
       
   
});


//Delete inventory
router.delete("/inventory/:id/takers/:id2",middleware.isLoggedIn_kalyanji, function(req, res){
   Inventory.findById(req.params.id, function(err,inventory){
      if(err){
          res.redirect("/members/inventory/"+ inventory._id);
      } else {
      	  inventory.takers.pull({ _id: req.params.id2 }) // removed
      	  inventory.save();
          res.redirect("/members/inventory/"+ inventory._id);
      }
   });
});

// EDIT Takers ROUTE
router.get("/inventory/:id/takers/:id2/edit", middleware.isLoggedIn_kalyanji, function(req, res){
    Inventory.findById(req.params.id, function(err, foundInventory){
        if(err){
          res.redirect("/members/inventory/"+ inventory._id);
      } else {
      	  // var found = foundInventory.takers.find({ _id: req.params.id2 }) // removed
      	  var found = foundInventory.takers.filter(function (inventory1) {
  //This tests if student.grade is greater than or equal to 90. It returns the "student" object if this conditional is met.
  						return inventory1._id.equals(req.params.id2 );
				});
      	  // console.log(found);
      	  // inventry.save();
          res.render("./landing/edit_takers", {found: found[0],id: req.params.id});
      }
    });
});

// UPDATE Takers ROUTE
router.put("/inventory/:id/takers/:id2",middleware.isLoggedIn_kalyanji, function(req, res){
    Inventory.findById(req.params.id, function(err, foundInventory){
        if(err){
          res.redirect("/members/inventory/"+ foundInventory._id);
      } else {
      	  foundInventory.takers.forEach(function(taker){
      	  	if(taker._id.equals(req.params.id2)){
      	  		taker.enr_no=req.body.enrollment;
      	  		taker.quantity=req.body.quantity;
              taker.mobile=req.body.mobile;
              taker.name=req.body.name;
      	  	}


      	  });

      }
      foundInventory.save();
      res.redirect("/members/inventory/"+ foundInventory._id);
    });
});

module.exports = router;
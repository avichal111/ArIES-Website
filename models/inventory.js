var mongoose = require("mongoose");

var inventorySchema = new mongoose.Schema({
   name: String,
   image: String,
   quantity: String,
   takers: [
      {
         enr_no: String,
         quantity: String,
         mobile: String,
         name: String
      }
   ]
});

module.exports = mongoose.model("Inventory", inventorySchema);
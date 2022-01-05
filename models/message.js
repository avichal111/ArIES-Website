var mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({
   name: String,
   email: String,
   subject: String,
   message: String,
   
});

module.exports = mongoose.model("Message", messageSchema);
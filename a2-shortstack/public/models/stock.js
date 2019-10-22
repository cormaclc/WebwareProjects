var mongoose = require("mongoose");

var stockSchema = new mongoose.Schema({
    ticker: String,
    shares: String,
    // buy price
    price: String,
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Stock", stockSchema);

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String, required: true },
  category: { type: String, required: true },

  // Stores the User's _id as a reference to the User document
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;

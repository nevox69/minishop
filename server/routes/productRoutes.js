const express = require("express");
const Protected = require("../middleware/authmiddleware");

require("dotenv").config();

const ProductModel = require("../models/Products");
const router = express.Router();

// POST / → create product, set user: req.userId (not from req.body — ignore whatever the frontend sends for this field, even if it does)
router.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find();

    if (products.length === 0) {
      return res
        .status(200)
        .json({ message: "No product found, Insert New One" });
    }
    res.status(200).json({ products, message: "All Producted are listed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET / → return ALL products (this is public browsing — every logged-in user should see everyone's products, unlike your old per-user Users list)

router.post("/", Protected, async (req, res) => {
  try {
    const newProduct = await ProductModel.create({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
      user: req.userId,
    });
    res
      .status(201)
      .json({ product: newProduct, message: "Successfully created" });
  } catch (err) {
    res.status(500).json({ message: "Error to create the Product" });
  }
});

// PUT /:id → before updating, fetch the product first, check if (product.user.toString() !== req.userId) → if mismatched, 403 Forbidden (not 401 — think about the difference: 401 means "you're not authenticated," 403 means "you ARE authenticated, but you're not allowed to do this specific thing")

router.put("/:id", Protected, async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Couldn't Find the Product" });
    }

    if (product.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "You can't bring changes in this Product" });
    }

    // EDIT / UPDATE HERE
    //  instead (  const updatedProduct = await ProductModel.findByIdAndUpdate()   you can do this

    product.title = req.body.title;
    product.price = req.body.price;
    product.description = req.body.description;
    product.image = req.body.image;
    product.category = req.body.category;

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.delete("/:id", Protected, async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Couldn't Find the Product" });
    }

    if (product.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "You can't bring changes in this Product" });
    }

    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Successfully Delted" });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;

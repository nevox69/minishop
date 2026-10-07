const express = require("express");
const Protected = require("../middleware/authmiddleware");
const upload = require("../middleware/upload");

require("dotenv").config();

const ProductModel = require("../models/Products");

const router = express.Router();


// GET PRODUCTS
router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const products = await ProductModel.find()
      .skip(skip)
      .limit(limit);

    const total = await ProductModel.countDocuments();
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      products,
      page,
      limit,
      totalPages,
      message:
        products.length === 0
          ? "No Products Found"
          : "All Products Listed",
    });

  } catch (err) {
    console.log("GET PRODUCT ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});


// CREATE PRODUCT + CLOUDINARY IMAGE
router.post(
  "/",
  Protected,
  upload.single("image"),
  async (req, res) => {

    // IMPORTANT:
    // If this doesn't appear in terminal,
    // Multer/Cloudinary failed before reaching this handler.
    console.log("🔥 POST PRODUCT ROUTE HIT");

    try {

      console.log("REQ.FILE:", req.file);
      console.log("REQ.BODY:", req.body);

      // Check image
      if (!req.file) {
        return res.status(400).json({
          message: "Image is required",
        });
      }

      const newProduct = await ProductModel.create({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,

        // Cloudinary URL
        image: req.file.path,

        category: req.body.category,

        // From JWT middleware
        user: req.userId,
      });

      console.log("✅ PRODUCT CREATED:", newProduct);

      res.status(201).json({
        product: newProduct,
        message: "Successfully created",
      });

    } catch (err) {

      console.log("🔥 PRODUCT ERROR:", err);

      res.status(500).json({
        message: err.message,
      });
    }
  }
);


// UPDATE PRODUCT
router.put("/:id", Protected, async (req, res) => {
  try {

    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Couldn't Find the Product",
      });
    }

    if (product.user.toString() !== req.userId) {
      return res.status(403).json({
        message: "You can't bring changes in this Product",
      });
    }

    product.title = req.body.title;
    product.price = req.body.price;
    product.description = req.body.description;
    product.image = req.body.image;
    product.category = req.body.category;

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);

  } catch (err) {

    console.log("UPDATE PRODUCT ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});


// DELETE PRODUCT
router.delete("/:id", Protected, async (req, res) => {
  try {

    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Couldn't Find the Product",
      });
    }

    if (product.user.toString() !== req.userId) {
      return res.status(403).json({
        message: "You can't delete this Product",
      });
    }

    await ProductModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Successfully Deleted",
    });

  } catch (err) {

    console.log("DELETE PRODUCT ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});


module.exports = router;
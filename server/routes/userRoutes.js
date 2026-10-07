const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");

require("dotenv").config();

const UserModel = require("../models/User");

const router = express.Router();

//------------ SIGN UP ------------------------------------------------------------------
router.post("/signup", async (req, res) => {
  try {
    const email = await UserModel.findOne({ email: req.body.email });

    if (email) {
      return res.status(400).json({ message: "Email already Exists" });
    }

    const hashedpassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedpassword,
    });

    res.status(200).json({ message: "User Created" });
  } catch (err) {
    res.status(500).json({ message: "User not created", err });
  }
});

//------------ LOGIN ------------------------------------------------------------------

router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "User does not Exist" });
    }

    const ismatch = await bcrypt.compare(req.body.password, user.password);

    if (!ismatch) {
      return res.status(401).json({ message: "Invalid Password or Email" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;

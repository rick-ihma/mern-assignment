const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
let User = require("../models/userModel");
let Customer = require("../models/customerModel");

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;

    if (!email || !password || !passwordCheck) {
      return res.status(400).json({ error: "Some field not be entered." });
    }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ error: "Password needs to be at least 5 characters." });
    }
    if (password !== passwordCheck) {
      return res
        .status(400)
        .json({ error: "Password and password confirmation are not match." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email has been already used." });
    }
    if (!displayName) {
      displayName = email;
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: passwordHash,
      displayName
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Some field not be entered." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "This email has not been registered." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Wrong password." });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        displayName: user.displayName
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      return res.json(false);
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json(false);
    }
    const user = await User.findById(verified.id);
    if (!user) {
      return res.json(false);
    }
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    user
  });
});

router.get("/:userId/customers", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await User.findById({ _id: userId }).populate("customers");
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/:userId/customers/add", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const customer = await Customer.collection.insertMany(req.body.data);
    const user = await User.findById({ _id: userId }).populate("customers");
    const result = user.customers.concat(customer.ops);
    user.customers = result;
    await user.save();
    res.json({ success: true, customers: result });
  } catch (e) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

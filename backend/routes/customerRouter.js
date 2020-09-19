const router = require("express").Router();
const auth = require("../middleware/auth");
let Customer = require("../models/customerModel");
let User = require("../models/userModel");

router.get("/", auth, async (req, res) => {
  const findCustomers = await Customer.find({ id: req.params._id }).populate(
    "customers"
  );
  try {
    res.json(findCustomers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/add", auth, async (req, res) => {
  try {
    const customer = new Customer(req.body);
    const response = await customer.save();
    const user = await User.findById({ _id: customer.user });
    user.customers.push(customer);
    await user.save();
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/customers/:id", async (req, res) => {
  const customer = new Customer({ ...req.body, owner: req.user._id });
  try {
    const savedCustomer = await customer.save();
    res.json(savedCustomer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

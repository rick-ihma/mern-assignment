const router = require("express").Router();
let Customer = require("../models/customer.model");

router.route("/").get((req, res) => {
  Customer.find()
    .then(customers => res.json(customers))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const type = req.body.type;
  const newCustomer = new Customer({ username, type });

  newCustomer
    .save()
    .then(() => {
      res.json("Customer added");
    })
    .catch(err => {
      res.status(400), json("Error: " + err);
    });
});

module.exports = router;

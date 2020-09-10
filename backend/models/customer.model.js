const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    type:{
      type: String,
      require: true
    }
  },
  {
    timestamps: true
  }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;

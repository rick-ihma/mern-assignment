const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    data: {
      type: Object,
      require: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref:'User'
    },
  },
  {
    timestamps: true
  }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true
    },
    password: {
      type: String,
      require: true,
      minLength: 5
    },
    displayName: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = User = mongoose.model("User", userSchema);

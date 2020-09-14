const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB successfulFly");
});

app.use("/users", require("./routes/userRouter"));
app.use("/customers", require("./routes/customerRouter"));

app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT: ${port}`);
});

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const app = express();
dotenv.config();
const cors = require("cors");

// allows all urls
app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("connected successfully");
    app.listen(process.env.PORT || 3000, (err) => {
      if (err) console.log(err);
      console.log("running successfully at : ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use(userRoutes);

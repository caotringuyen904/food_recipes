const express = require("express");
const BlogRoutes = require("./routes/BlogsRoute");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middleware/error/errorHandler.js");
const route = require("./routes/index.js");
const ReviewRoutes = require("./routes/ReviewRoute");
const path = require("path");

//create the server
const app = express();

app.use(cors());

//use middleware
app.use(express.json({ limit: "25mb" }));
app.use(express.static(path.join(__dirname, "../client/build")))

app.use(morgan("combined")); // 'combined' is one of the predefined log formats

app.use(morgan("combined")); // 'combined' is one of the predefined log formats

//Routes
app.use("/api/v1/blogs", BlogRoutes);
app.use("/auth", userRoutes);
app.use("/", route);
app.use("/api/v1/reviews", ReviewRoutes);
app.use(errorHandler);

//Error handling middleware
app.use((error, req, res, next) => {
  res.status(400).json({ success: false, error: error.message });
});

//connecting to DB
mongoose
  //.connect(process.env.MONGO_URI, { dbName: process.env.DATABASE_NAME })
  .connect(process.env.URI)
  .then(() => {
    //make the server listening on port 4567
    app.listen(process.env.PORT, () => {
      console.log("connect & listen");
    });
  })
  .catch((e) => {
    console.log(e);
  })
  .catch((e) => {
    console.log(e);
  });

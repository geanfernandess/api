// const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

// const postsRoutes = require("./routes/postsRoute");
const userRoutes = require("./routes/userRoute");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
	"Access-Control-Allow-Headers",
	"Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
	"Access-Control-Allow-Methods",
	"GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// app.use("/posts", postsRoutes);
app.use("/user", userRoutes);

module.exports = app;

const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const { authRouter, categoryRouter } = require("./routes");
const connectMongoDb = require("./init/MongoDB");
const morgan = require("morgan");
const { errorHandler } = require("./middlewares");
const notFoundController = require("./controllers/notFoundController");
//connect database
connectMongoDb();

//* initialize app
const app = express();

//use thirdparty middlewares
app.use(express.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
app.use(morgan("dev"));
//routes
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/category/", categoryRouter);
//api not found route
app.use("*", notFoundController);
// use error handler middleware
app.use(errorHandler);

module.exports = app;

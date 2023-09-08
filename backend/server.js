require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const connect = require("./config/db");
// connect to database
connect();
// midelewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/users", userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started: ${port}`));

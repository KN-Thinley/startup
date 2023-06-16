const express = require("express");
const app = express();

//directory match
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//serves static pages
app.use(express.static(path.join(__dirname, "/view")));

// database
require("./database/mongoose");

// routes
const adminRouter = require("./route/adminRoute");

app.use(adminRouter);

module.exports = app;

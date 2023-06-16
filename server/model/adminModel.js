const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    require: true,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password cannot contain the word password init");
      }
    },
  },
});

adminSchema.statics.findbyCredentials = async (email, password) => {
  const user = await adminS.findOne({ email: email });

  if (!user) {
    throw "User not found";
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw "Invalid Password";
  }
  return user;
};

// pre for before and post for after

adminSchema.pre("save", async function (next) {
  // this refers to individual
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const adminS = mongoose.model("adminS", adminSchema);
module.exports = adminS;

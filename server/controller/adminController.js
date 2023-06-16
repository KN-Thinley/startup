const adminModel = require("../model/adminModel");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "../configuration/config.env" });

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signUpAdmin = async (req, res) => {
  try {
    const admin = await adminModel.create(req.body);

    console.log(req.body);
    res.status(201).json({
      message: "successful",
      data: {
        adminData: admin,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const admin = await adminModel.findbyCredentials(
      req.body.email,
      req.body.password
    );
    const token = signToken(admin._id);
    //checking the admins credentials
    res.status(200).send({ message: admin, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logoutAdmin = (req, res) => {
  try {
    res.clearCookie(`session_id`);
    res.status(200).json({ message: "Admin Logged Out" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signUpAdmin, loginAdmin, logoutAdmin };

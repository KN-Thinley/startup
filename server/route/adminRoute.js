const express = require("express");
const adminCredentials = require("../controller/adminController");
const router = express.Router();

router.post("/admin/signup", adminCredentials.signUpAdmin);
router.post("/admin/login", adminCredentials.loginAdmin);
router.get("/admin/logout", adminCredentials.logoutAdmin);

module.exports = router;

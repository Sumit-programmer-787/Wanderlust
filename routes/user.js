const express = require("express");
const { route } = require("./listing");
const router = express.Router();

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});



module.exports = router;
const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
    res.render("home", {title: req.url});
});

module.exports = router;
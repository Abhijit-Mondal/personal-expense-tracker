const express = require("express");
const router = express.Router();

const { total_expenses_grouped_by_categories } = require("../db/custom-queries");

router.get("/", async (req, res) => {
    const expenseSumByCategories = await total_expenses_grouped_by_categories();
    res.render("home", {title: req.url, expenseSumByCategories: expenseSumByCategories});
});


module.exports = router;
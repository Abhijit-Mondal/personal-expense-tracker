const express = require("express");
const router = express.Router();
const config = require("config");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

const { createExpense, getExpenses, getExpense, updateExpense, removeExpense, Expense } = require("../models/Expense");
const { getCategories } = require("../models/Category");

router.get("/add", async (req, res) => { 
    const categories = await getCategories();
    res.render("add_expense", {title: req.url, categories: categories});
});

router.get("/view/:categoryId", async (req, res) => { 
    const expenses = await Expense.find({ category: req.params.categoryId }).populate("category");
    const baseurl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    res.render("view_expense", {title: expenses[0].category.name, baseurl: baseurl, expenses: expenses});
});

router.get("/", async (req, res) => {
    const expenses = await getExpenses();
    res.status(200).send(expenses);
});



router.get("/:id", async (req, res) => { 
    try {
        const expense = await getExpense(req.params.id);
        if (expense)
            res.status(200).send(expense);
        else
            res.status(404).json({message: "404 object not found"});
    }
    catch (err) {
        dbDebugger(err);
        res.status(400).send(err);
    }
});

router.post("/", async (req, res) => { 
    try {
        const result = await createExpense(req.body);
        res.redirect("/");
    }
    catch (err) {
        dbDebugger(err);
        res.status(400).send(err);
    }
});

router.put("/:id", async (req, res) => { 
    try {
        const result = await updateExpense(req.params.id, req.body);
        res.status(200).send(result);
    }
    catch (err) {
        dbDebugger(err);
        res.status(400).send(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const result = await removeExpense(req.params.id);
        if (result)
            res.status(200).send(result);
        else
            res.status(404).json({message: "404 object not found"});
    }
    catch (err) {
        dbDebugger(err);
        res.status(400).send(err);
    }
});



module.exports = router;
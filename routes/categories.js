const express = require("express");
const router = express.Router();
const config = require("config");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

const {createCategory, getCategories, getCategory,  updateCategory, removeCategory } = require("../models/Category");

router.get("/add", (req, res) => { 
    res.render("add_category", {title: req.url});
});

router.get("/view", async (req, res) => { 
    const categories = await getCategories();
    res.render("view_category", {title: req.url, categories: categories});
});

router.get("/", async (req, res) => {
    const categories = await getCategories();
    res.status(200).send(categories);
});



router.get("/:id", async (req, res) => { 
    try {
        const category = await getCategory(req.params.id);
        if (category)
            res.status(200).send(category);
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
        const result = await createCategory(req.body);
        res.redirect("/api/categories/view");
    }
    catch (err) {
        dbDebugger(err);
        res.status(400).send(err);
    }
});

router.put("/:id", async (req, res) => { 
    try {
        const result = await updateCategory(req.params.id, req.body);
        res.status(200).send(result);
    }
    catch (err) {
        dbDebugger(err);
        res.status(400).send(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const result = await removeCategory(req.params.id);
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
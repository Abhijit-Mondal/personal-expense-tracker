const dbDebugger = require("debug")("app:db");
const Joi = require("joi");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        lowercase: true,
        trim: true
    },
    color: {
        type: String,
        required: true,
        validator: function (value) {
            if (value.indexOf("#") === 0) {
                if (value.length === 7)
                    return true;
                else if (value.length === 4)
                    return true;
            }
            return false;
        },
        message: "Invalid Color."
    }
});

const Category = mongoose.model("Category", categorySchema);

// Get all categories
async function getCategories() {
    const categories = await Category.find().sort("name");
    dbDebugger(categories);
    return categories;
}

// Get category
async function getCategory(id) {
    const category = await Category.findById(id);
    dbDebugger(category);
    return category;
}

// Filter categories
async function filterCategories(filter) {
    const categories = await Category.find(filter);
    dbDebugger(categories);
    return categories;
}

// Create category
async function createCategory(categoryObject) {

    // data validation
    const { error } = validateCategory(categoryObject);
    if (error)
        throw error;
    
    const category = new Category(categoryObject);
    const result = await category.save();
    dbDebugger(result);
    return result;
}

// Update category
async function updateCategory(id, newCategory) {
    
    // data validation
    const { error } = validateCategory(newCategory);
    if (error)
        throw error;
         
    const result = await Category.findByIdAndUpdate(id, newCategory, { new: true });
    dbDebugger(result);
    return result;
}

// Delete category
async function removeCategory(id) {
    const result = await Category.findByIdAndRemove(id);
    dbDebugger(result);
    return result;
}

// Category validation function
function validateCategory(category) {
    const schema = Joi.object({
        name: Joi.string().required(),
        color: Joi.string().required()
    });

    return schema.validate(category);
}


module.exports = { createCategory, getCategories, getCategory,  updateCategory, removeCategory };
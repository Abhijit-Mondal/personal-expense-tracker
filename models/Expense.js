const dbDebugger = require("debug")("app:db");
const Joi = require("joi");
const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    amount: {
        type: mongoose.Decimal128,
        required: true,
        min: 1
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Expense = mongoose.model("Expense", expenseSchema);

// Get all expenses
async function getExpenses() {
    const expenses = await Expense.find().populate("category", "name color -_id").sort("date");
    dbDebugger(expenses);
    return expenses;
}

// Get expense
async function getExpense(id) {
    const expense = await Expense.findById(id);
    dbDebugger(expense);
    return expense;
}

// Filter expense
async function filterExpense(filter) {
    const expenses = await Expense.find(filter);
    dbDebugger(expenses);
    return expenses;
}

// Create expense
async function createExpense(expenseObject) {

    // data validation
    const { error } = validateExpense(expenseObject);
    if (error)
        throw error;
    
    const expense = new Expense(expenseObject);
    const result = await expense.save();
    dbDebugger(result);
    return result;
}

// Update expense
async function updateExpense(id, newExpense) {
    
    // data validation
    const { error } = validateExpense(newExpense);
    if (error)
        throw error;
         
    const result = await Expense.findByIdAndUpdate(id, newExpense, { new: true });
    dbDebugger(result);
    return result;
}

// Delete genre
async function removeExpense(id) {
    const result = await Expense.findByIdAndRemove(id);
    dbDebugger(result);
    return result;
}

// Expense validation function
function validateExpense(expense) {
    const schema = Joi.object({
        category: Joi.string().required(),
        amount: Joi.number().required(),
        date: Joi.date()
    });

    return schema.validate(expense);
}


module.exports = { createExpense, getExpenses, getExpense,  updateExpense, removeExpense };
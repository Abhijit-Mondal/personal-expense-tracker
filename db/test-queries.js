require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URI)
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log("Error:", err));

const { Expense } = require("../models/Expense");
const { Category } = require("../models/Category");


async function total_expenses_grouped_by_categories()
{
    const aggregatedExpenses = await Expense.aggregate([
        {
            $lookup:
            {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category_data"
            }
        },
        {
            $group:
            {
                "_id": "$category_data.name",
                "color": {"$first" : "$category_data.color"},
                "totalExpense": { $sum: "$amount" }
            }
        }
    ]);

    console.log(aggregatedExpenses);
}

total_expenses_grouped_by_categories();
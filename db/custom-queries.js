const { Expense } = require("../models/Expense");
const { Category } = require("../models/Category");

async function total_expenses_grouped_by_categories()
{
    const aggregatedExpenses = await Expense.aggregate([
        {
            $addFields: 
            {
                category_id: { $toString: "$category" }
            }
        },  
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
                "category_id": { "$first": "$category_id"},  
                "color": {"$first" : "$category_data.color"},
                "totalExpense": { $sum: "$amount" }
            }
        }
    ]);

    console.log(aggregatedExpenses);

    return aggregatedExpenses;
}

module.exports = { total_expenses_grouped_by_categories };
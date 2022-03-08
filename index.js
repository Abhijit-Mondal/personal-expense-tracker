require("dotenv").config();

const express = require("express");
const app = express();


app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");


const homeRouter = require("./routes/home");
app.use("/", homeRouter);



app.listen(process.env.DEV_PORT, () => { 
    console.log(`Server Started at Port:${process.env.DEV_PORT}`);
});


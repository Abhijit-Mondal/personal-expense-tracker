// Environment Variables
require("dotenv").config();

// Express framework
const express = require("express");
const app = express();

// Debugging
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

// Middlewares
const logger = require("./middlewares/logger");
const authenticator = require("./middlewares/authenticator");
const helmet = require("helmet");
const morgan = require("morgan");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(logger);
app.use(authenticator);
app.use(helmet());

const contentSecurityPolicy = require("helmet-csp");

app.use(
  contentSecurityPolicy({
    useDefaults: true,
    directives: {
        defaultSrc: ["'self'", "default.example"],
        scriptSrc: ["'self'", "fonts.googleapis.com"],
        fontSrc: [
            "'self'",
            'fonts.googleapis.com',
            'themes.googleusercontent.com',
            'fonts.gstatic.com'
        ],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
    },
    reportOnly: false,
  })
);


if (process.env.NODE_ENV === "development") {
    startupDebugger("Morgan is enabled");
    app.use(morgan("tiny"));
}

// Configuration
const config = require("config");
startupDebugger(`Application Name: ${config.get("name")}`);
startupDebugger(`Mail Server: ${config.get("mail.host")}`);
startupDebugger(`Mail Server Password: ${config.get("mail.password")}`);
app.set("views", "./views");
app.set("view engine", "ejs");

// Database
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URI)
    .then(() => dbDebugger("Connected to MongoDB database at:", process.env.DATABASE_URI))
    .catch(err => dbDebugger("Error while connecting to MongoDB database", err));


// Routes
const homeRoute = require("./routes/home");
app.use("/", homeRoute);
const expenseRoutes = require("./routes/expenses");
app.use("/api/expenses", expenseRoutes);
const categoryRoutes = require("./routes/categories");
app.use("/api/categories", categoryRoutes);

// Listener
const port = process.env.PORT || 3000;
app.listen(port, () => startupDebugger(`Server started on port: ${port}`));
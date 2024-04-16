require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const session = require("express-session");

const errorController = require("./controllers/errorController");
const router = require("./routes");

const app = express();

// Using middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));

const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
  })
);

app.use((req, res, next) => {
  req.requestTime = new Date();
  next();
});

app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");

app.use(router);

app.use(errorController.onLost);
app.use(errorController.onError);

module.exports = app;

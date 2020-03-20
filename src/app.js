const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const port = process.env.PORT || 4000;

// Define paths for express config
const pubDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve.
app.use(express.static(pubDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Trevor Rounce"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Trevor Rounce"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Trevor Rounce",
    content: "Welcome to the help page"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address)
    return res.send({ error: "You need to provide an address." });

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error });

      forecast(latitude, longitude, location, (error, data) => {
        if (error) return res.send({ error });

        res.send({
          forecast: data,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search)
    return res.send({ error: "you must provide a search term" });

  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help Article not found",
    name: "Trevor Rounce"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "Trevor Rounce"
  });
});

app.listen(port, () => {
  console.log("listening on port 4000");
});

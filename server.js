///////////////////
// Mongoose Store
///////////////////

////////////////
// Dependencies
////////////////

require("dotenv").config()

const express = require("express")
const app = express()

const PORT = process.env.PORT

const coffee = require("./models/coffee.js")

const morgan = require("morgan")
const methodOverride = require("method-override")

////////////////
// Middleware
////////////////

// Body Parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Morgan
app.use(morgan("tiny"))

// Static (public folder)
app.use("/static", express.static("public"))

// MethodOverride Dep
app.use(methodOverride("_method")) 

////////////////
// Routes
////////////////

// INDUCES - Index, New, Delete, Update, Create, Edit, Show

app.get("/", (req, res) => {
    res.send("You are Home!")
})

// Index - GET

app.get("/store", (req, res) => {
    res.render("index.ejs", {cafe: coffee})
})

// New

// Delete

// Update

// Create 

// Edit

// Show

////////////////
// Listener
////////////////

app.listen(PORT, () => {
    console.log(`You are listening on port ${PORT}`)
})
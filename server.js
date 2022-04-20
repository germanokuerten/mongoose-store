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

////////////////
// Middleware
////////////////

// Static (public folder)
app.use("/static", express.static("public"))

////////////////
// Routes
////////////////

// INDUCES - Index, New, Delete, Update, Create, Edit, Show

app.get("/", (req, res) => {
    res.send("You are Home!")
})

// Index - GET

app.get("/store", (req, res) => {
    res.send("index.ejs")
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

app.listen(PORT, (req, res) => {
    console.log(`You are listening on port ${PORT}`)
})
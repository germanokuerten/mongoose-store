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
app.use(express.static("public"))

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

app.get("/cafe", (req, res) => {
    res.render("index.ejs", {cafe: coffee})
})


// New

app.get("/cafe/new", (req, res) => {
    res.render("new.ejs"), {
    }
})

app.post("/cafe", (req, res) => {
    req.body = req.body
    coffee.push(req.body)
    res.redirect("/cafe")
})

// Delete

app.delete("/cafe/:id", (req, res) => {
    // grab the index from params
    const index = req.params.id
    // splice the fruit from fruits
    coffee.splice(index, 1)
    // redirect back to main page
    res.redirect('/cafe')
  })

// Update

app.get("/cafe/:id/edit", (req, res) => {
    res.render("edit.ejs", {
        cafe: coffee[req.params.id],
        index: req.params.id
    })
})


// Create 

// Edit

app.put("/cafe/:id", (req, res) => {
    // convert readyToEat to a Boolean
    // if (req.body.readyToEat === "on"){
    //   req.body.readyToEat = true
    // } else {
    //   req.body.readyToEat = false
    // }
    const newCafe = {...coffee[req.params.id]}
    Object.assign(newCafe, req.body)
    
    coffee[req.params.id] = newCafe
    
    res.redirect("/cafe")
  })

// Show

app.get("/cafe/:id", (req, res) => {
    res.render("show.ejs", {cafe: coffee[req.params.id]})
})

////////////////
// Listener
////////////////

app.listen(PORT, () => {
    console.log(`You are listening on port ${PORT}`)
})
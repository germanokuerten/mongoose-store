///////////////////
// Mongoose Store
///////////////////

////////////////
// Dependencies
////////////////

// .env
require("dotenv").config()

// Web framework
const express = require("express")

// Object Document Manager (Work with DB)
const mongoose = require("mongoose")

// Override request methods (Post - Put / Post - Delete)
const methodOverride = require("method-override")

// Used for logging
const morgan = require("morgan")


//////////////////////////////
// Setup Database Connection
//////////////////////////////

// loading db url
const DATABASE_URL = process.env.DATABASE_URL

// Establish connection
mongoose.connect(DATABASE_URL)

// Save the connection
const cnx = mongoose.connection

// Setup mongoose connection messages
cnx
.on("open", () => console.log("Mongo Connection is Open"))
.on("close", () => console.log("Mongo Connection is Closed"))
.on("error", (err) => console.log(err))


//////////////////////////////
// Schemas and Models
//////////////////////////////

// Schema - the definition of our data type
// Model - the object working with our data type

const drinkSchema = new mongoose.Schema({
    name: String,
    description: String,
    img: String,
    drinkImage: String,
    price: String,
    qty: String,
}, {timestamps: true})

const Drink = mongoose.model("Drink", drinkSchema)

//////////////////////////////
// Express Application
//////////////////////////////

const app = express()


//////////////////////////////
// Middleware
//////////////////////////////

// override request methods for form submissions
app.use(methodOverride("_method"))
// log every request
app.use(morgan("dev"))
// Parse html form bodies into req.body
app.use(express.urlencoded({extended: true}))
app.use(express.json())
// serve files statically
app.use("/static", express.static("static"))


//////////////////////////////
// Routes
//////////////////////////////

// INDUCES - Index, New, Delete, Update, Create, Edit, Show

// Home Route
app.get("/", (req, res) => {
    res.render("home.ejs")
})

// Index Route
app.get("/drink", async (req, res) => {
    // go get Drinks
    const drinks = await Drink.find({})
    // render index.ejs
    res.render("index.ejs", {drink: drinks})
})

// Seed Route
app.get("/drink/seed", async (req, res) => {
    // delete all existing drinks
    await Drink.remove({}).catch((err) => res.send(err))
    // add sample drinks
    const drinks = await Drink.create([
        {
          name: "Latte",
          description:
            "Organic espresso coffee with our homemade organic oat milk.",
          img: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          price: 4,
          qty: 99,
        },
        {
          name: "Cappuccino",
          description: "Organic espresso coffee with homemade organic oat milk.",
          img: "https://images.unsplash.com/photo-1534778101976-62847782c213?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FwcHVjY2lub3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60",
          price: 5,
          qty: 0,
        },
        {
          name: "Hot Cacau with a splash of coffee",
          description: "Organic Mayan Cacau from Yucatan, organic Peruvian Maca, and organic homemade oat milk with a splash of our organic single sourced coffee from South Brazil.",
          img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FwcHVjY2lub3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60",
          price: 6,
          qty: 1,
        },
      ]).catch((err) => res.send(err))
    // send the drinks as json
    res.json(drinks)
})

// New Route
app.get("/drink/new", (req, res) => {
    res.render("new.ejs")
})

// Delete Route
app.delete("/drink/:id", async (req, res) => {
    const index = req.params.id
    await Drink.findByIdAndDelete(index).catch((err) => console.log(err))
    res.redirect("/drink")
})

// Update Route
app.put("/drink/:id", async (req, res) => {
    const updatedDrink = await Drink.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.redirect("/drink")
})

// Create
app.post("/drink", async (req, res) => {
    await Drink.create(req.body).catch((err) => res.send(err))
    res.redirect("/drink/")
})

// Edit
app.get("/drink/:id/edit", async (req, res) => {
    const editedDrink = await Drink.findById(req.params.id).catch((err) => res.send(err))
    res.render("edit.ejs", {
        drink: editedDrink,
        index: req.params.id
    })
})

// Show Route
app.get("/drink/:id", async (req, res) => {
    const showDrink = await Drink.findById(req.params.id).catch((err) => res.send(err))
    res.render("show.ejs", {drink: showDrink})
})


////////////////
// Listener
////////////////

// Config
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`You are listening on port ${PORT}`)
})
const express = require("express");
const path = require("path");
const hbs = require("hbs");
require("./public/db/connection");

var app = express();

const Register = require("./public/models/registers");
const { errorMonitor } = require("events"); 
const staticPath = path.join(__dirname, ("/public"));
const templatePath = path.join(__dirname, ("/templates/views"));
const partialsPath = path.join(__dirname, ("/templates/partials"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.static(staticPath));
hbs.registerPartials(partialsPath)

app.get("/", (req, res)=> {
    res.render("signup");
});

app.post("/signup", async (req, res)=> {
    try {
      const registerUser = new Register({
          name : req.body.name,
          age : req.body.age,
          username : req.body.username,
          password : req.body.password
      })

      
      const registered = await registerUser.save();
      res.status(201).render("index");
        
    } catch (error) {
     res.status(400).send(error);
    }
});


app.get("/login", (req, res)=> {
    res.render("login");
})

app.post("/login", async(req, res)=> {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const username_result = await Register.findOne({username:username})

        if (username_result.password === password) {
          res.status(200).render("index");  
        }else{
          res.send("Invalid login credentials");  
        }
    } catch (error) {
        res.status(500).send("Invalid login details");
    }
})
app.get("/home",(req, res)=>{
    res.render("index");
})

app.get("/desc",(req, res)=>{
    res.render("description");
})

app.get("/h&m",(req, res)=>{
    res.render("h&m");
})

app.get("/cart",(req, res)=>{
    res.render("cart");
})

app.get("/",(req, res)=>{
    res.send("Hello");
})

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), ()=>{
    console.log("Listening on port " + app.get("port"));
});

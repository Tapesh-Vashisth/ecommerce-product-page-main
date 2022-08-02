const express = require("express");
const handlebars = require("express3-handlebars").create({defaultLayout: 'main'});
const bodyParser = require("body-parser");
const app = express();

// cart 
cart = [
    
]

// view engine 
app.engine('handlebars', handlebars.engine);
app.set("view engine", "handlebars");

// static content 
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({extended:false}));
// app.use(favicon(__dirname + "public/media/images/logo.svg"));

// setting port 
app.set("port", process.env.PORT || 3000);

app.get("/", function(req, res){
    res.render("home", {cart: cart});
})

app.post("/cart/add", function(req, res){
    let total = req.body.amount * req.body.cost;

    let decider = cart.some(function(x){
        return x.title === req.body.title;
    })

    if (decider){
        cart = cart.map(function(x){
            if (x.title === req.body.title){
                x.quantity = Number(x.quantity) + Number(req.body.amount);
                return x;
            }else{
                return x;
            }
        })

        res.send(cart);
    }else{
        let temp = {
            title: req.body.title,
            cost: req.body.cost,
            quantity: req.body.amount,
            total: total
        }
        cart = [...cart, temp];

        res.send(cart);
    }
})

app.post("/cart/remove", function(req, res){
    cart = cart.filter(function(x){
        return x.title !== req.body.title;
    })
    
    res.send(cart);
})

app.use(function(req, res, next){
    res.status(404);
    res.render("404", {message: 404, layout: 'layout_error'});
})

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render("500", {message: 500, layout: 'layout_error'})
})

app.listen(app.get("port"), function(){
    console.log(`server started at localhost:${app.get("port")}`);
})
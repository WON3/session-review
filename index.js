require('dotenv').config();
const express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    app = express(),
    port = process.env.SERVER_PORT;

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}))


app.use((req, res, next) => {
    if(!req.session.cart){
        req.session.cart = [];
    }
    next();
});

app.get('/', (req, res) =>{
    res.send('hello world')
})

app.post('/api/cart', (req, res) =>{
    const product = req.body;
    req.session.cart.push(product);
    res.send(req.session.cart);
})

app.get('/api/cart', (req, res) =>{
    const {cart} = req.session;
    res.send(cart)
})

app.delete('/api/cart/:index', (req, res)=>{
    const {cart} = req.session;
    const {index} = req.params;
    cart.splice(index, 1);
    res.send(cart);
})

app.listen(port, ()=>{
    console.log(`Now listening on port ${port}`)
})
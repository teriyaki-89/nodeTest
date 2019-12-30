const express = require('express');
const path = require('path');
const hbs = require('hbs');


const app = express();


// Define Paths
let public = path.join(__dirname, '../public')
let viewsPath = path.join(__dirname, '../templates/views');
let partialsPath = path.join(__dirname, '../templates/partials');

// HandleBars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Static directory to server 
//app.use(express.static(public))

app.get('', (req, res) => {
    //console.log(req);
    console.log(req.query.search)
    res.send( {
        req:req.query.search
    })
    //  res.render('index', {
    //     title: 'dynamic title',
    //     body: 'body goes here'
    // });
})

app.get('/help', (req, res) => {
    res.send('help ');
})

app.listen(3000, () => {
    console.log('starting app')
})
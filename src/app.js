const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;


//Define paths for express configuration
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handlebars and view location
app.set('view engine','hbs');
app.set('views',viewsPath);
app.set('partials',partialsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));


// app.get('/help',(req,res) => {
// // res.send();
// });

// app.get('/about',(req,res) => {
//    // res.send();
// });

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather',
        name:'Kiran TK'
    });
});

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About',
        name:'Kiran TK'
    });
});

app.get('/weather',(req,res) => {
    
    const address = req.query.address;
    if(!address)
    {
        return res.send({
            error:'You must provide a valid address'
        });
    }
   geocode(address,(error,{longitude,latitude,location} = {}) => {
       if(error)
       {
           res.send({
               error
           });
       }
       forecast(longitude,latitude,(error,forecastData) => {
        if(error)
        {
            res.send({error});
        }
        res.send({
            forecast:forecastData,
            location:location,
            address
        });
       });
   });
    
});

app.get('/products',(req,res) => {
    if(!req.query.search) {
       return res.send({
            error:'You must provide a search term!'
        });
    }
    console.log(req.query.search);
    res.send({
        products:[]
    });
});

app.get('/help',(req,res) => {
    res.render('help',{
        message:'This a standard weather app',
        title:'Help',
        name:'Kiran TK'
    });
});

app.get('/help/*',(req,res) => {
   // res.send('Help article not found!');
   res.render('404',{
       title:'404',
       name:'Kiran TK',
       error:'Help article not found!'
   });
});

app.get('*',(req,res) => {
   // res.send('My 404 page');
   res.render('404',{
    title:'404',
    name:'Kiran TK',
    error:'Page not found!'
   });
});

app.listen(port,() => {
    console.log('Server is up and running on port '+port);
});
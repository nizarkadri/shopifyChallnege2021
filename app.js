const express = require('express');
const port = 8080;
const token = "20bd20a1";
const app = express();
const ejs = require('ejs');
const fetch = require("node-fetch");

var movie;
var list;
app.use(express.json());
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));

app.post('/search', (req, res) => {

    movie = req.body.query;
    console.log("movie searched = " + movie);
    res.sendStatus(200,"SUCCESSFULL");
})
app.get('/search', (req, res) => {

    var myHeaders = new fetch.Headers();
    var uri = "http://www.omdbapi.com/?s="+movie+"&type=movie&plot=short&apikey=20bd20a1";
    
    console.log("function called--" + uri);
    
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(uri, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            list = JSON.parse(result);
            // res.send(list.Search);
            res.render('index', {
                Data: list
            });
        })
        .catch(error => console.log('error', error));

})

app.get('/', (req, res) => {
    
    var result = { "Search": [{"Title":"Movie Title","Year":"Release year"}]}
    res.render("index", {
        Data:result
    });
})

app.listen(port, () =>{
    console.log("Listening at 8080");
})


let express = require('express');
let bodyPraser = require('body-parser');
let path = require('path');
let save_to_json = require('./modules/save_data_to_json/save_to_json');
let getResults = require('./modules/search/SearchQuery');
var fs = require('fs');

let app = express();

app.use(bodyPraser.json());
app.use(bodyPraser.urlencoded({extended: false}));


app.get('/', function(req,res){

    res.send('Simple Elastic Search App');
});

app.get('/search', async (req, res) => {
    //req.query.color1 === 'red'  // true
    //req.query.color2 === 'blue' // true
    let query_field = req.query.field;
    if(query_field === undefined || query_field === ''){
        console.log("query field is "+ query_field);
    }
    else{
        console.log(query_field);
    }
    let temp = await getResults(req.query.q,query_field);
    // let results = temp;
    if(temp.length <= 0){
        
        res.send("0 matches found");
    }
    else{
        
    res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(temp));
    }
});

app.post('/index', (req, res) => {
    //req.query.color1 === 'red'  // true
    //req.query.color2 === 'blue' // true
   // console.log(req.body);
    if(save_to_json(req.body)){
        res.send("Success: Saved your data");
    }
    else{
        res.send("Failed: Something went wrong");
    }
});
app.listen(3000,function(){
    console.log("server started on localhost 3000");
});
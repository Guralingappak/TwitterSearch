const express=require('express');
const path=require('path');
const url=require('url');
const Request=require("request");
 var OAuth = require('oauth');
 var moment=require('moment');
var app=express();

app.set("view engine","pug");
app.set("views",path.join(__dirname+"/views"));
app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/js/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/'));

var config={
    twitterConsumerKey:"LZjVYimB7F68UDfnJ7rcUkWtc", twitterSecretKey:"isHRQG8oW7S0IEjfOGpK885mqY9rJVA2aG4ZaXIQhxSstb9Mmn",
     accessToken:"1331249216-g6kSmpNZYUR4rPpIkkLORYnBO5pseu3IYjg8fcq",
      accessTokenSecret:"phsiKTaaHOM3YC1yiTYjQIOrYVmlss3UFkaPLwKApk5D9",
}

var oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    config.twitterConsumerKey,
    config.twitterSecretKey,
    '1.0A',
    null,
    'HMAC-SHA1'
);



var data="Hello";
 Request.get("https://twitter.com/search?q=oncology&src=tyah", (error, response, body) => {
    if(error) {
        console.log("Hello");
    }
    data=body;
    //console.log(body);
    
});  
app.get("/",function(req,res)
{
 
res.send(data);
res.end();
});
app.get("/login",function(req,res)
{
res.render("login");
res.end();
});
// app.get("/getTwits/:count/:searchkey/",function(req,res)
// {
//     var currentDate=new moment();
//     var toDate=currentDate.add('years',-2);
//     var cuurentDateFromated=currentDate.format("YYYYMMDD");
//     var toDateFromated=toDate.format("YYYYMMDD");    
//     console.log(toDateFromated);
//     var query= "http://gnip-api.twitter.com/search/:product/accounts/:account_name/:development.json?query=TwitterDev%20%5C%22search%20api%5C%22&maxResults=500&fromDate="+cuurentDateFromated+"&toDate="+ toDateFromated;
//     oauth.get(
//     query,
//     config.accessToken,
//     config.accessTokenSecret,
//     function (e, data, res1){
//         if (e) console.error(e);
//         console.log(data);
//         // console.log(JSON.parse(data.toString()).statuses.length);
//          res.contentType="application/json";
//    res.send(data.toString());
//     });
//     // res.send(data1);
//     //  console.log(data1);
  

// });
app.get("/getTwits/:count/:searchkey/",function(req,res)
{
    var query= 'https://api.twitter.com/1.1/search/tweets.json?count='+req.params.count+'&q='+req.params.searchkey;   
    oauth.get(
    query,
    config.accessToken,
    config.accessTokenSecret,
    function (e, data, res1){
        if (e) console.error(e);
        console.log(data);
        // console.log(JSON.parse(data.toString()).statuses.length);
         res.contentType="application/json";
   res.send(data.toString());
    });
    // res.send(data1);
    //  console.log(data1);
  

});
app.get("/getTwits/:count/:searchkey/:maxid",function(req,res)
{
    
    var query= 'https://api.twitter.com/1.1/search/tweets.json?count='+req.params.count+'&q='+req.params.searchkey+'&max_id='+req.params.maxid;
        
    
    oauth.get(
    query,
    config.accessToken,
    config.accessTokenSecret,
    function (e, data, res1){
        if (e) console.error(e);
        console.log(data);
        // console.log(JSON.parse(data.toString()).statuses.length);
         res.contentType="application/json";
   res.send(data.toString());
    });
    // res.send(data1);
    //  console.log(data1);
  

});
app.get("/getTwitsByKey/:count/:searchkey",function(req,res)
{
    var data1="";
    oauth.get(
    'https://api.twitter.com/1.1/search/tweets.json?count='+req.params.count+'&q='+req.params.searchkey,
    config.accessToken,
    config.accessTokenSecret,
    function (e, data, res1){
        if (e) console.error(e);
        console.log(data);
        // console.log(JSON.parse(data.toString()).statuses.length);
        data1=data;
         res.contentType="application/json";
   res.send(JSON.parse(data.toString()).statuses);
    });
    // res.send(data1);
    //  console.log(data1);
  

});
app.listen(3000);
console.log("Server started");
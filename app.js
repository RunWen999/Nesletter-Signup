//api = dbdbed3a8df747c8720d535a7262aa3d-us21
//list id = 3ed4643e7f
const https = require("https");
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.eMail;
    console.log(firstName,lastName,email);

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/3ed4643e7f"
    const options = {
        method: "POST",
        auth: "runwen:dbdbed3a8df747c8720d535a7262aa3d-us21"
    }

    const request = https.request(url, options, function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});

app.post("/success", function(req, res){
    res.redirect("/");
})

app.post("/failure", function(req, res){
    res.redirect("/");
})















app.listen(3000, function(){
    console.log("listening")
})
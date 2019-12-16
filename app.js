//jshint esversion:6

const express = require("express");
const bodyParser=require("body-parser");
const request=require("request");
const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});


app.post("/",function(req,res){
          var firstName = req.body.fName;
          var lastName = req.body.lName;
          var email=req.body.email;

          var data = {
            members:[
              {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                  FNAME:firstName,
                  LNAME:lastName

                }
              }
            ]
          };

          var jsonData=JSON.stringify(data);

          var options={
            url: "https://us4.api.mailchimp.com/3.0/lists/46738b9388",
          method:"POST",
          headers:{
            "Authorization":"harmeet fe9e9bcef89f8c27733a44b0db52ae6b-us4"
          },
            body:jsonData
          };
          request(options,function(errors,response,body){
          if(errors){
            res.sendFile(__dirname + "/failure.html");
          }else{
            if(response.statusCode === 200){
              res.sendFile(__dirname + "/success.html");
            }else{
              res.sendFile(__dirname + "/failure.html");
            }
          }
});


app.post("/failure.html", function(req,res){
  res.redirect("/");
});


});
app.listen( process.env.PORT||3000,function(){
  console.log("Server running at port 3000");
});

//Api key fe9e9bcef89f8c27733a44b0db52ae6b-us4

//list-id 46738b9388

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});
app.post("/",function(req,res){
  const FirstName = req.body.firstName;
  const LastName = req.body.lastName;
  const email = req.body.eMail;
  // console.log(FirstName, LastName, email);

  const data ={
    members:[
      {
        email_address: email,
        status : "subscribed",
        merge_fields:{
          FNAME : FirstName,
          LNAME : LastName
        }

      }
    ]
  };

  const jsonData  = JSON.stringify(data);
  const url ="https://us17.api.mailchimp.com/3.0/lists/271828e5da";
  const options ={
    method : "POST",
    auth:"mohit:20b0da7adfe01c495cb310b81bae6eb1-us17"
  };
  const request = https.request(url, options,function(response){
    if (response.statusCode === 200){
      res.sendFile(__dirname +"/success.html");
    }else {
      res.sendFile(__dirname + "/failure.html");

    }

    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(){
  res.redirect("/")
})
app.listen(process.env.PORT || 4000,function(){
  console.log("Server is running on 4000");
})
//api key
// 20b0da7adfe01c495cb310b81bae6eb1-us17

//unique id
//271828e5da

const express = require("express");
const app = express();
const { json } = require("body-parser");
const https = require("https");
const request = require("request");

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/sign-up.html");
});
app.post("/", function(req, res) {
    var firstname = req.body.fname;
    var lastname = req.body.lname;
    var email = req.body.email;

    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname,
            },
        }, ],
    };
    var jsondata = JSON.stringify(data);

    const url = "https://us6.api.mailchimp.com/3.0/lists/5877f0eb3d";
    const Option = {
        method: "POST",
        auth: "rizwan:66d221cf67d50f5e7e699fdb0b36f474-us6",
    };

    const request = https.request(url, Option, function(response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/public/seccess.html");
        } else {
            res.sendFile(__dirname + "/public/failure.html");
        }
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsondata);
    request.end();
});

app.post("/failure", function(req, res) {
    res.redirect("/");
});
app.post("/seccess", function(req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("server is being started at port: 3000");
});

// keys 66d221cf67d50f5e7e699fdb0b36f474-us6

// id 5877f0eb3d
const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");

app.use(cookieParser("secretcode"));

app.get("/getsignedcookie", (req, res) => {
    res.cookie("madeIn", "India", {signed: true});
    res.send("signed cookie sent");
});


app.get("/verify", (req,res) => {
    console.log(req.cookies);
    res.send("verified");
});


app.get("/getcookies", (req, res) => {
    res.cookie("greet", "namaste");
    res.cookie("madeIn", "India");
    res.send("sent you some cookies!");
});

app.use("/users", users);
app.use("/posts", posts);

app.listen(3000, () => {
    console.log("server is listening to 3000");
});
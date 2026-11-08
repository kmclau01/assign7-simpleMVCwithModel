const express = require('express');
const userDB = require('./models/userDB');

const app = express();
const PORT = 3000;

// ** Middleware **
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");


// ** Routes ***
app.get("/", function (req, res) {
    userDB.getUsers(function (data) {
        console.log(data);
        res.render("manageUsers", { users: data });
    });
});

app.get("/addUser", function(req, res) {

    res.render("addUser");

});

app.post("/users", function (req, res) {
    userDB.addUser(req.body, function (data) {
        console.log(data);
        res.redirect("/");
    });
});

app.post("/users/:id/delete", function(req, res) {

    userDB.deleteUser(req.params.id, function() {

        res.redirect("/");
    });

});


app.listen(PORT, function () {
    console.log(`Listening on Port: ${PORT}`);
});

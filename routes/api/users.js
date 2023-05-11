const express = require("express");

const router = express.Router();

const uuidv1 = require('uuid');
let users = require("../../Users");


router.get("/", (req, res) => {
    console.log("GETTING BACK ALL USERS");
    res.json(users);
  });

router.get("/:id", (req, res) => {
const found = users.some(user => user.id === parseInt(req.params.id));

if (found) {
    res.json(users.filter(user => user.id === parseInt(req.params.id)));
} else {
    res.sendStatus(400);
}
});

router.post("/", (req, res) => {
const newUser = {
    id: uuidv1.v1(),
    name: req.body.name,
    email: req.body.email
};

if (!newUser.name || !newUser.email) {
    console.log(newUser)
    return res.sendStatus(400);
}

users.push(newUser);
res.json(users);
});

router.put("/:id", (req, res) => {
const found = users.some(user => user.id === parseInt(req.params.id));

if (found) {
    const updUser = req.body;
    users.forEach(user => {
    if (user.id === parseInt(req.params.id)) {
        user.name = updUser.name || user.name;
        user.email = updUser.email || user.email;

        res.json({ msg: "User updated", user });
    }
    });
}
else{
res.sendStatus(400);
}


});

router.delete("/:id", (req, res) => {
    
    const found = users.some(user => user.id === parseInt(req.params.id));

    if (found) {
        users = users.filter(user => user.id !== parseInt(req.params.id));
        res.json({ msg: "User deleted", users });
    } else {
        res.sendStatus(400);
    }
});


module.exports = router;


  
  
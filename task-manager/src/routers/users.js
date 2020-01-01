const express = require("express");
const router = new express.Router();
const User = require("../models/user");

router.post("/users", async (req, res) => {
    //console.log(req.body);
    const user = new User(req.body);

    try {
        await user.save();
        res.status(200);
        res.send(user);
    } catch (e) {
        res.status(400);
        res.send(e);
    }
    // user.save()
    //     .then(result => {
    //         res.status(200);
    //         res.send(result);
    //     })
    //     .catch(e => {
    //         res.status(400);
    //         res.send(e);
    //     });
});

router.get("/users", async (req, res) => {
    try {
        let users = await User.find({ name: req.query.name });
        res.status(200).send(users);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get("/users/:id", async (req, res) => {
    // console.log(req.params);
    try {
        const user = await User.find({ _id: req.params.id });
        res.status(201).send(user);
    } catch (e) {
        res.status(404).send(e);
    }
});

router.patch("/users/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    let allowedProperties = ["name", "email", "password", "age"];
    var breakException = {};
    try {
        updates.forEach(property => {
            console.log(property);
            if (allowedProperties.indexOf(property) == -1) {
                throw breakException;
            }
        });
    } catch (e) {
        return res.status(404).send({ response: "illegal property" });
    }

    try {
        const user = await User.findByIdAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true, useFindAndModify: false }
        );
        if (!user) return res.status(404).send();
        res.status(201).send(user);
    } catch (e) {
        res.status(404).send(e);
    }
});

router.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(404).send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;

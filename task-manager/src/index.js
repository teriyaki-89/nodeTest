const express = require("express");

require("./db/mongoose");
const User = require("./models/user");
const Tasks = require("./models/tasks");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", (req, res) => {
    //console.log(req.body);
    const user = new User(req.body);
    user.save()
        .then(result => {
            res.status(200);
            res.send(result);
        })
        .catch(e => {
            res.status(400);
            res.send(e);
        });
});

app.get("/users", (req, res) => {
    // console.log(req.query);
    User.find({ name: req.query.name })
        .then(result => {
            res.status(200).send(result);
        })
        .catch(e => {
            res.status(500).send(e);
        });
});

app.get("/users/:id", (req, res) => {
    // console.log(req.params);
    User.find({ _id: req.params.id })
        .then(result => {
            res.send(result);
        })
        .catch(e => {
            res.status(500).send(e);
        });
});

app.post("/tasks", (req, res) => {
    const user = new Tasks(req.body);
    user.save()
        .then(result => {
            res.status(200);
            res.send(result);
        })
        .catch(e => {
            res.status(400);
            res.send(e);
        });
});

app.get("/tasks", (req, res) => {
    // console.log(req.query);
    Tasks.find({})
        .then(tasks => {
            res.status(200).send(tasks);
        })
        .catch(e => {
            res.status(500).send(e);
        });
});

app.get("/tasks/:id", (req, res) => {
    //console.log(req.params.id);
    //const _id = req.params.id;
    //Tasks.findById(_id)
    Tasks.find({ _id: req.params.id })
        .then(tasks => {
            res.status(200).send(tasks);
        })
        .catch(e => {
            res.status(500).send(e);
        });
});

app.listen(port, () => {
    console.log("server is up on port " + port);
});

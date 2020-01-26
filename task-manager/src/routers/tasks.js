const express = require("express");

const Tasks = require("../models/tasks");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/tasks", auth, (req, res) => {
    const task = new Tasks({
        ...req.body,
        owner: req.user._id
    });
    task.save()
        .then(result => {
            res.status(200);
            res.send(result);
        })
        .catch(e => {
            res.status(400);
            res.send(e);
        });
});

router.get("/tasks", (req, res) => {
    // console.log(req.query);
    Tasks.find({})
        .then(tasks => {
            res.status(200).send(tasks);
        })
        .catch(e => {
            res.status(500).send(e);
        });
});

router.get("/tasks/:id", (req, res) => {
    Tasks.find({ _id: req.params.id })
        .then(tasks => {
            res.status(200).send(tasks);
        })
        .catch(e => {
            res.status(500).send(e);
        });
});

router.patch("/tasks/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    let allowedProperties = ["description", "completed"];

    try {
        updates.forEach(property => {
            if (allowedProperties.indexOf(property) == -1) {
                console.log(property);
                throw new Exception("");
            }
        });
    } catch (e) {
        return res.status(404).send({ response: "illegal property" });
    }
    try {
        const task = await Tasks.findById({ _id: req.params.id });
        updates.forEach(update => (user[update] = req.body[update]));
        await task.save();

        // Tasks.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true,
        //     useFindAndModify: false
        // })
        //     .then(tasks => {
        //         res.status(200).send(tasks);
        //     })
        //     .catch(e => {
        //         res.status(500).send(e);
        //     });
        if (!task) return res.status(404).send();
        res.status(201).send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.delete("/tasks/:id", async (req, res) => {
    try {
        const task = await Tasks.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send();
        }
        res.status(404).send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;

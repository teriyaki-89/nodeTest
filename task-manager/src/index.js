const express = require("express");

require("./db/mongoose");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

const userRouter = require("./routers/users");
const taskRouter = require("./routers/tasks");

app.use(userRouter, taskRouter);

app.listen(port, () => {
    console.log("server is up on port " + port);
});

const Task = require("./models/tasks");
const User = require("./models/user");

const main = async () => {
    // const task = await Task.findById("5e2bc45b4615a13ec0ca515b");
    // await task.populate("owner").execPopulate();
    //console.log(task.owner);

    const user = await User.findById("5e2bbdb7a77bae31809a2c95");
    await user.populate("tasks").execPopulate();
    console.log(user.tasks);
};
main();

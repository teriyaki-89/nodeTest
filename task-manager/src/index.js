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

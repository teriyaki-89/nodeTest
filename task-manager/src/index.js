const express = require("express");

require("./db/mongoose");
const app = express();

const port = process.env.PORT || 3000;


const multer = require('multer');
const upload = multer({
    dest: 'images', 
    limits: {
        fileSize: 1000000
        /*1Mb */
    },
    fileFilter(req, file, cb) {
        cb(new Error('Please upload an image'))
        cb(undefined,true);
        cb(undefined,false);

    }
});

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
})

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
    /* find user by task*/
    // const task = await Task.findById("5e2bc45b4615a13ec0ca515b");
    // await task.populate("owner").execPopulate();
    //console.log(task.owner);
    /* find tasks by user */
    // const user = await User.findById("5e2bbdb7a77bae31809a2c95");
    // await user.populate("tasks").execPopulate();
    //console.log(user.tasks);
};
main();


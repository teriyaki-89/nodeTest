const mongoose = require("mongoose");

const validator = require("validator");

const Tasks = mongoose.model("Tasks", {
    description: { type: String, required: true },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = Tasks;

const mongoose = require("mongoose");

const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: { type: String },
    age: { type: Number },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("must be email");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (value.length < 6) {
                throw new Error("should be not less than 6 figures");
            }
        }
    }
});

const bcrypt = require("bcryptjs");

userSchema.pre("save", async function(next) {
    const user = this;

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

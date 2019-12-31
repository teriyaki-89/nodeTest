const mongoose = require("mongoose");

const validator = require("validator");

const User = mongoose.model("User", {
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
    }
});

// const user = new User({ name: "Ilo", age: 30, email: "ilik@mail.kz" });

// user.save()
//     .then(result => {
//         //console.log(result);
//         console.log(user);
//     })
//     .catch(e => {
//         console.log(e);
//     });

module.exports = User;

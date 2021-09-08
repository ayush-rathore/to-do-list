const mongoose = require("mongoose");
const User = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.ObjectID,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("user", User, "user");

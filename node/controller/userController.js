const mongoose = require("mongoose");
const User = require("../models/user");
const JWT = require("jsonwebtoken");

exports.signup = (req, res) => {
    let { name, email, password } = req.body;
    let user = new User({ name, email, password });
    user.save()
        .then(() => {
            const token = getToken(user);
            console.info(`User created with name ${name}`);
            return res.status(200).send({ user, token });
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).send("Error in creating User");
        });
};

exports.login = (req, res) => {
    let { email, password } = req.body;
    User.findOne({ email: email })
        .then((user) => {
            if (user) {
                if (password === user.password) {
                    const token = getToken(user);
                    console.info("Login successful");
                    return res.status(200).send({ user, token });
                }
                console.warn("Password Incorrect");
                return res.status(401).send("Password incorrect");
            }
            console.error(`User with email ${email} is not registered`);
            return res
                .status(404)
                .send(`User with email ${email} is not registered`);
        })
        .catch((error) => {
            console.error(error);
            return res.status(404).send(error);
        });
};

const getToken = (user) => {
    return JWT.sign(
        {
            email: user.email,
        },
        "to-do-list",
        {
            expiresIn: "24h",
        }
    );
};

const User = require("../models/user");

exports.signup = (req, res) => {
	let { userName, password } = req.body;
	let user = new User({ userName, password });
	user.save()
		.then(() => {
			console.info(`User created with name ${user.userName}`);
			return res.status(200).send(user);
		})
		.catch((error) => {
			console.error(error);
			return res.status(500).send("Error in creating User");
		});
};

exports.login = (req, res) => {
	let { userName, password } = req.body;
	User.findOne({ userName })
		.then((user) => {
			if (user) {
				if (password === user.password) {
					console.info(`${userName} logged in`);
					return res.status(200).send(user);
				}
				console.warn("Password Incorrect");
				return res.status(401).send("Password incorrect");
			}
		})
		.catch((error) => {
			console.error(`User not found`);
			return res.status(404).send(error);
		});
};

exports.users = (req, res) => {
	User.find()
		.then((users) => {
			if (users) {
				return res.status(200).send(users);
			}
		})
		.catch((error) => {
			return res.status(500).send(error);
		});
};

const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
// const bcrypt = require("bcrypt");




// Creation
router.post("/register", async (req, res) => {
	try {
		// const salt = 10;
		// const hashedPass = await bcrypt.hash(req.body.password, salt);
		const newUserObj = new User({
			// req.body
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		});

		const user = await newUserObj.save();
		res.status(200).json(user)

	} catch (err) {
		res.status(500).json(err);
	}
})



module.exports = router;
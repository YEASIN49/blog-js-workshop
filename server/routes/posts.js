const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// CREATE POST
router.post("/", async (req, res) => {
	const newPost = new Post(req.body);

	try {
		const postAuthor = await User.findOne({ username: newPost.username });

		try {
			if (postAuthor.username === newPost.username && postAuthor.password === newPost.password){
				console.log({ AUT: postAuthor, PASS: postAuthor.password })
				try {
					const savePost = await newPost.save();
					res.status(200).json(savePost);
				} catch (error) {
					res.status(500).json(`[${error}]Unable to save post`)
				}
			}
			else{
				res.status(401).json("You are not the valid Author")
			}
		} catch (err) {
			res.status(401).json("You are not the valid Author")
		}
	} catch (err) {
		res.status(5000).json(`[${err}] user not found`);
	}
});


// GET ALL POST
router.get("/", async (req, res) => {
	try {
		let requiredPost = await Post.find();
		
		res.status(200).json(requiredPost);
	} catch (error) {
		res.status(500).json(error);
	}
})


// DELETE POST
router.delete("/delete", async (req, res) => {
	
	try {
		
		const claim = req.body;
		console.log( claim.id )
		const post = await Post.findById(claim.id);
		
		const postAuthor = await User.findOne({ username: claim.username });
		
		if ( post.username === claim.username && postAuthor.password === claim.password) {
			// console.log('ENTERED')
			try {
				let result = await post.delete()
				// console.log({ result })
				res.status(200).json("Post deleted successfully")
			} catch (error) {
				res.status(500).json('error while deleting');
			}
		} else {
			res.status(401).json("You cannot delete other's post")
		}
	} catch (error) {
		res.status(500).json('error');
	}
})

module.exports = router;
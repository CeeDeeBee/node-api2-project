const express = require("express");

const db = require("../data/db");

const router = express.Router();

router.get("/", (req, res) => {
	db.find()
		.then((posts) => res.status(200).json(posts))
		.catch((err) => {
			res
				.status(500)
				.json({ error: "The posts information could not be retrieved." });
		});
});

router.get("/:id", (req, res) => {
	db.findById(req.params.id)
		.then((post) => {
			if (post.length) {
				res.status(200).json(post);
			} else {
				res
					.status(404)
					.json({ message: "The post with the specified ID does not exist." });
			}
		})
		.catch((err) =>
			res
				.status(500)
				.json({ error: "The post information could not be retrieved" })
		);
});

router.get("/:id/comments", (req, res) => {
	db.findPostComments(req.params.id)
		.then((comments) => {
			if (comments.length) {
				res.status(200).json(comments);
			} else {
				res
					.status(404)
					.json({ message: "The post with the specified ID does not exist." });
			}
		})
		.catch((err) =>
			res
				.status(500)
				.json({ error: "The comments information could not be retrieved." })
		);
});

router.post("/", (req, res) => {
	if (req.body.title && req.body.contents) {
		db.insert(req.body)
			.then((idObj) => {
				db.findById(idObj.id)
					.then((post) => res.status(201).json(post))
					.catch((err) => {
						res.status(500).json({ error: "Unable to save post." });
					});
			})
			.catch((err) => {
				res.status(500).json({ error: "Unable to save post." });
			});
	} else {
		res
			.status(400)
			.json({ error: "Please provde title and contents for the post." });
	}
});

router.post("/:id/comments", (req, res) => {
	if (req.body.text) {
		db.insertComment(req.body)
			.then((idObj) => {
				db.findCommentById(idObj.id)
					.then((comment) => res.status(201).json(comment))
					.catch((err) =>
						res.status(500).json({
							error:
								"There was an error while saving the comment to the database",
						})
					);
			})
			.catch((err) =>
				res
					.status(404)
					.json({ error: "The post with the specified ID does not exist" })
			);
	} else {
		res.status(400).json({ error: "Please provide text for the comment." });
	}
});

module.exports = router;

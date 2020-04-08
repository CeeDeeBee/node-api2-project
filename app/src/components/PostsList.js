import React, { useState, useEffect } from "react";
import axios from "axios";

import PostsCard from "./PostsCard";

const PostsList = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/posts")
			.then((res) => setPosts(res.data))
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="posts-list">
			<h1>Hobbit Posts</h1>
			{posts.map((post) => (
				<PostsCard post={post} />
			))}
		</div>
	);
};

export default PostsList;

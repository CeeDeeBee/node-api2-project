import React from "react";

const PostsCard = ({ post }) => {
	return (
		<div className="posts-card">
			<h2>{post.title}</h2>
			<p>{post.contents}</p>
		</div>
	);
};

export default PostsCard;

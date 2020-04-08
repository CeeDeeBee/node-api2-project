const express = require("express");
const cors = require("cors");

const server = express();

const router = require("./posts/router");

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
	res.send("Server running");
});

server.use("/api/posts", router);

const port = 5000;
server.listen(port, () => {
	console.log(`\n<=== Server running on port ${port} ===>\n`);
});

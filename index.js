const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
	res.send("Server running");
});

const port = 5000;
server.listen(port, () => {
	console.log(`\n<=== Server running on port ${port} ===>\n`);
});

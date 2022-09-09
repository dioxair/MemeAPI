const express = require("express");
const app = express();
const memes = require("./memes")();

app.use(function logger(req, res, next) {
	console.log(new Date().toString())
	console.log("")
	console.log(`${req.method} ${req.path} - ${req.ip}`);
	console.log("")
	next();
});

app.get("/", (req, res) => {
	res.send(">w<")
});

app.listen(3000, () => {
	console.log("Started server!");
});

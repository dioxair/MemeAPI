const express = require("express");
const app = express();
require("./memes")();

function getTime() {
	const date = new Date();
	
	let dateAndTime = date.toLocaleString('en-US', {
		timeZone: 'America/New_York',
	});

	return dateAndTime;
}

app.use(function logger(req, res, next) {
	console.log(`${getTime()} EST - ${req.method} ${req.path} - ${req.ip}`);
	console.log("")
	next();
});

app.get("/", (req, res) => {
	res.set("Access-Control-Allow-Origin", "*");
	res.json({
		"meme": memeLinks[Math.floor(Math.random() * memeLinks.length)]
	})
});

app.listen(3000, () => {
	console.log("Started server!");
});

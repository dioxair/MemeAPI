const express = require("express");
const app = express();
const rateLimit = require('express-rate-limit')
require("./memes")();

function getTime() {
	const date = new Date();

	let dateAndTime = date.toLocaleString('en-US', {
		timeZone: 'America/New_York',
	});

	return dateAndTime;
}

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 50,
	standardHeaders: true,
	legacyHeaders: false,
})

app.use(limiter)

app.use(function logger(req, res, next) {
	console.log(`${getTime()} EST - ${req.method} ${req.path} - ${req.ip}`);
	console.log("")
	next();
});

app.get("/v1/api", (req, res) => {
	let fileType
	res.set("Access-Control-Allow-Origin", "*");
	let meme = memeLinks[Math.floor(Math.random() * memeLinks.length)]
	if (meme.includes(".mp4")) {
		fileType = "mp4"
	} else if (meme.includes(".png")) {
		fileType = "png"
	} else if (meme.includes(".gif")) {
		fileType = "gif"
	}
	res.json({
		"meme": meme,
		"fileType": fileType
	})
});

app.listen(3000, () => {
	console.log("Started server!");
});

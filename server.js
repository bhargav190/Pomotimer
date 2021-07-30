const path = require("path");
const express = require("express");

var http = require("http");

var router = express.Router();

var app = express();
var httpServer = http.createServer(app);

httpServer.listen(process.env.PORT || 3000);

router.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.use("/static", express.static(__dirname));

app.use("/", router);
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");
const express = require("express");

var http = require("http");

var router = express.Router();

var app = express();
var httpServer = http.createServer(app);

httpServer.listen(process.env.PORT || 3000);

router.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "index.html"));
});

router.post("/addTask", function (req, res) {
	fs.readFile('tasks.csv', function (err, data) {
		fs.writeFile('tasks.csv',
		data.toString() + "\n" +
		req.body.taskname + "," + req.body.pomodoros,
		function(){
			console.log(req.body);
			res.send({ response: "OK cool!" });
		});
	})
});

router.get("/tasks", function (req, res) {
	let tasks = [];
	fs.createReadStream('tasks.csv')
		.pipe(csv())
		.on('data', function (data) {
			tasks.push(data)
		})
		.on('end', function () {
			res.send(tasks);
		});
});



app.use("/static", express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

if(!fs.existsSync('tasks.csv')){
	fs.writeFileSync('tasks.csv','taskname,pomodoros');
}
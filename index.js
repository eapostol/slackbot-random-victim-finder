const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
const monWed = require('./classes/mon-wed');
const tueThu = require('./classes/tue-thu');
const sat = require('./classes/sat');

// const sat = monWed.concat(tueThu);  // doesn't work. 

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send(
		'Hello There'
	);
});

app.get('/mw', (req, res) => {
	res.send(
		monWed[Math.floor(Math.random() * monWed.length)]
	);
});

app.get('/tth', (req, res) => {
	res.send(
		tueThu[Math.floor(Math.random() * tueThu.length)]
	);
});

app.get('/sat', (req, res) => {
	res.send(
		// console.log(sat.length)
		// console.log(sat)
		console.log(sat[Math.floor(Math.random() * sat.length)])
		// sat[Math.floor(Math.random() * sat.length)]
	);
});

app.listen(port, () => console.log(
	`Server Running on Port ${port}`
));
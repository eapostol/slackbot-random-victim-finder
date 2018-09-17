const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const monWed = require('../../classes/mon-wed');
const tueThu = require('../../classes/tue-thu');
const sat = monWed.concat(tueThu); 


// `/api/random/test`
router.get('/test', (req, res) =>
	res.json({ msg: "this works"})
);

router.get('/', (req, res) => {
	res.send(
		'Hello There'
	);
});

router.get('/mw', (req, res) => {
	res.send(
		monWed[Math.floor(Math.random() * monWed.length)]
	);
});

router.get('/tth', (req, res) => {
	res.send(
		tueThu[Math.floor(Math.random() * tueThu.length)]
	);
});

router.get('/sat', (req, res) => {
	res.send(
		// console.log(sat.length)
		// console.log(sat)
		// console.log(sat[Math.floor(Math.random() * sat.length)])
		sat[Math.floor(Math.random() * sat.length)]
	);
});

// post request
router.post('/mw', (req, res) => {
	const value = monWed[Math.floor(Math.random() * monWed.length)];
	res.status(200).send(
		{
			"text": `*${value}* you are the lucky one. thank you and play again. :smile:`
		}
	);
});

module.exports = router;
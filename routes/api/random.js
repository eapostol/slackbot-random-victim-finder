const express = require('express');
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
router.post('/', (req, res) => {
	const mwVictim = monWed[Math.floor(Math.random() * monWed.length)];
	const tthVictim = tueThu[Math.floor(Math.random() * tueThu.length)];
	const satVictim = sat[Math.floor(Math.random() * sat.length)];
	
	const requestType = req.body.text;
	// console.log('1', req)
	// console.log('2', req.body)
	console.log('3', requestType);

	if(requestType === 'mw'){
		res.status(200).send(
			{
				"text": `\n_*${mwVictim}*_ you are the lucky one. \nThank you, come again. \n:slightly_smiling_face:\n`
			}
		
	)}
	if(requestType === 'tth'){
		res.status(200).send(
			{
				"text": `_*${tthVictim}*_ you are the lucky one. \nThank you, come again. \n:slightly_smiling_face:`
			}
		
	)}
	if(requestType === 'sat'){
		res.status(200).send(
			{
				"text": `\n_*${satVictim}*_ you are the lucky one. \nThank you, come again. \n:slightly_smiling_face:\n`
			}
		
	)}
	else {
		res.status(200).send(
		{
			"text": "\nYikes! \nHmm, something doesn't look right. \nThank you, come again. \n:thinking_face:\n"
		}
	)}
})

module.exports = router;
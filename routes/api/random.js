const express = require('express');
const router = express.Router();

const monWed = require('../../options/mwClass');
const tueThu = require('../../options/tthClass');
const bye = require('../../options/sayonara');
const emojis = require('../../options/emojis');
const selectVictim = require('../../options/anotherVictim');

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
	const goodbye = bye[Math.floor(Math.random() * bye.length)];
	const emoji = emojis[Math.floor(Math.random() * emojis.length)];
	
	const requestType = req.body.text;
	// console.log('1', req)
	console.log('**** 2', req.body);
	console.log('**** 3', req.body.payload);
	// console.log('**** 4', req.body.payload.callback_id); 
	// console.log('**** 5', requestType);

	if(requestType === 'mw'){
		res.status(200).send(
			{
				"text": `Hey _*${mwVictim}*_ you are the lucky one. \n${goodbye} \n${emoji}`,
				"attachments": [
					selectVictim
				]
			}
	)}
	if(requestType === 'tth'){
		res.status(200).send(
			{
				"text": `Hey _*${tthVictim}*_ you are the lucky one. \n${goodbye} \n${emoji}`
			}
		
	)}
	if(requestType === 'sat'){
		res.status(200).send(
			{
				"text": `Hey _*${satVictim}*_ you are the lucky one. \n${goodbye} \n${emoji}`
			}
		
	)}
	// clicking button
	if(req.body.callback_id === 'hunt_victim_mw'){
		res.status(200).send(
			{
				"text": "this works!"
			}
		
	)}
	else {
		res.status(200).send(
		{
			"text": `Zoinks! \nSomething doesn't look right. \nPlease try again. \n${emoji}`
		}
	)}
})

module.exports = router;
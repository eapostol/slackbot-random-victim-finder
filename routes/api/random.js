const express = require('express');
const router = express.Router();

const monWed = require('../../options/mwClass');
const tueThu = require('../../options/tthClass');
const bye = require('../../options/bye');
const emojis = require('../../options/emojis');
const anotherVictim = require('../../options/anotherVictim');
const lucky = require('../../options/lucky');

const sat = monWed.concat(tueThu); 

const mwVictim = () => {
	return monWed[Math.floor(Math.random() * monWed.length)];
}
const tthVictim = () => {
	return tueThu[Math.floor(Math.random() * tueThu.length)];
}
const satVictim = () => { 
	return sat[Math.floor(Math.random() * sat.length)];
}

let mwVictimSelected = [];
let tthVictimSelected = [];
let satVictimSelected = [];

// run set timeout function once a post request comes through. at the end, reset all the let variables above. every new set timeout function call resets the clock back to zero.

// post request
router.post('/', (req, res) => {
	let mwVictimTemp = mwVictim();
	// const tthVictim = tueThu[Math.floor(Math.random() * tueThu.length)];
	// const satVictim = sat[Math.floor(Math.random() * sat.length)];
	const byeMsg = bye[Math.floor(Math.random() * bye.length)];
	const luckyMsg = lucky[Math.floor(Math.random() * lucky.length)];
	const emoji = emojis[Math.floor(Math.random() * emojis.length)];
	
	const requestType = req.body.text;
	// console.log('**** 1', req)
	// console.log('**** 2', req.body);
	// console.log('**** 3', requestType);

	if(requestType === 'mw'){
		// if `mwVictim` is in `mwVictimSelected` then rerun function expression
		for (let present of mwVictimSelected){
			if (present === mwVictimTemp){
				mwVictim();
				console.log('***** present', present);
				console.log('***** mwVictimTemp', mwVictimTemp);
			} else {
				mwVictimSelected.push(mwVictim);
				res.status(200).send(
					{
						"text": `_*${mwVictimTemp}*_${luckyMsg} \n${byeMsg} \n${emoji}`,
						"attachments": [
							anotherVictim.mw
						]
					}
				)
			}
		}

		// res.status(200).send(
		// 	{
		// 		"text": `_*${mwVictim}*_${luckyMsg} \n${byeMsg} \n${emoji}`,
		// 		"attachments": [
		// 			anotherVictim.mw
		// 		]
		// 	}
		// )
	}
	if(requestType === 'tth'){
		res.status(200).send(
			{
				"text": `_*${tthVictim}*_${luckyMsg} \n${byeMsg} \n${emoji}`,
				"attachments": [
					anotherVictim.tth
				]
			}
		
	)}
	if(requestType === 'sat'){
		res.status(200).send(
			{
				"text": `_*${satVictim}*_${luckyMsg} \n${byeMsg} \n${emoji}`,
				"attachments": [
					anotherVictim.sat
				]
			}
		
	)}
	// clicking button
	// if(req.body.callback_id === 'hunt_victim_mw'){
	if(req.body.payload){
		const secondRequest = JSON.parse(req.body.payload);
		// console.log('**** 4', req.body.payload);
		// console.log('**** 5', req.body.payload.callback_id); 
		// console.log('**** 6', secondRequest.callback_id);

		if(secondRequest.callback_id === 'hunt_victim_mw'){
			res.status(200).send(
				{
					"text": `_*${mwVictim}*_${luckyMsg} \n${byeMsg} \n${emoji}`,
					"attachments": [
						anotherVictim.mw
					]
				}
		)}
		if(secondRequest.callback_id === 'hunt_victim_tth'){
			res.status(200).send(
				{
					"text": `_*${tthVictim}*_${luckyMsg} \n${byeMsg} \n${emoji}`,
					"attachments": [
						anotherVictim.tth
					]
				}
		)}
		if(secondRequest.callback_id === 'hunt_victim_sat'){
			res.status(200).send(
				{
					"text": `_*${satVictim}*_${luckyMsg} \n${byeMsg} \n${emoji}`,
					"attachments": [
						anotherVictim.sat
					]
				}
		)} else {
			res.status(200).send(
			{
				"text": `Zoinks! \nSomething doesn't look right. \nPlease try again. \n${emoji}`
			}
		)}
	} else {
		res.status(200).send(
		{
			"text": `Zoinks! \nSomething doesn't look right. \nPlease try again. \n${emoji}`
		}
	)}
})

module.exports = router;
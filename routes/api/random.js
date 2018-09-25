const express = require('express');
const randomNum = require("random-js")();
const router = express.Router();

const monWed = require('../../options/mwClass');
const tueThu = require('../../options/tthClass');
const bye = require('../../options/bye');
const emojis = require('../../options/emojis');
const anotherVictim = require('../../options/anotherVictim');
const lucky = require('../../options/lucky');

const sat = monWed.concat(tueThu); 


// post request
router.post('/', (req, res) => {
	let mwVictim = monWed[randomNum.integer(0, (monWed.length)-1)];
	// console.log('******** value', value); 
	// let mwVictim = Math.floor(Math.random() * monWed.length);
	let tthVictim = tueThu[Math.floor(Math.random() * tueThu.length)];
	let satVictim = sat[Math.floor(Math.random() * sat.length)];
	let byeMsg = bye[Math.floor(Math.random() * bye.length)];
	let luckyMsg = lucky[Math.floor(Math.random() * lucky.length)];
	let emoji = emojis[Math.floor(Math.random() * emojis.length)];
	
	const requestType = req.body.text;
	// console.log('**** 1', req)
	// console.log('**** 2', req.body);
	// console.log('**** 3', requestType);

	if(requestType === 'mw'){
		return res.status(200).send(
			{
				"text": `_*${mwVictim}*_${luckyMsg} \n${byeMsg} \n${emoji}`,
				"attachments": [
					anotherVictim.mw
				]
			}
	)}
	if(requestType === 'tth'){
		return res.status(200).send(
			{
				"text": `_*${tthVictim}*_${luckyMsg} \n${byeMsg} \n${emoji}`,
				"attachments": [
					anotherVictim.tth
				]
			}
		
	)}
	if(requestType === 'sat'){
		return res.status(200).send(
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
			return res.status(200).send(
				{
					"text": `_*${mwVictim}*_${luckyMsg} \n${byeMsg} \n${emoji}`,
					"attachments": [
						anotherVictim.mw
					]
				}
		)}
		if(secondRequest.callback_id === 'hunt_victim_tth'){
			return res.status(200).send(
				{
					"text": `_*${tthVictim}*_${luckyMsg} \n${byeMsg} \n${emoji}`,
					"attachments": [
						anotherVictim.tth
					]
				}
		)}
		if(secondRequest.callback_id === 'hunt_victim_sat'){
			return res.status(200).send(
				{
					"text": `_*${satVictim}*_${luckyMsg} \n${byeMsg} \n${emoji}`,
					"attachments": [
						anotherVictim.sat
					]
				}
		)} else {
			return res.status(200).send(
			{
				"text": `Zoinks! \nSomething doesn't look right. \nPlease try again. \n${emoji}`
			}
		)}
	} else {
		return res.status(200).send(
		{
			"text": `Zoinks! \nSomething doesn't look right. \nPlease try again. \n${emoji}`
		}
	)}
})

module.exports = router;
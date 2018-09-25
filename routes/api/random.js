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

	// fyi, I did previously use Math.floor(Math.random() * x) but some felt the randomnes wasn't so random
	let mwVictim = monWed[randomNum.integer(0, (monWed.length)-1)];
	let tthVictim = tueThu[randomNum.integer(0, (tueThu.length)-1)];
	let satVictim = sat[randomNum.integer(0, (sat.length)-1)];
	let byeMsg = bye[randomNum.integer(0, (bye.length)-1)];
	let luckyMsg = lucky[randomNum.integer(0, (lucky.length)-1)];
	let emoji = emojis[randomNum.integer(0, (emojis.length)-1)];
	
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
	if(requestType === 'reset'){
		return res.status(200).send(
			console.log('will reset list to include everyone')
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
const express = require('express');
const randomNum = require("random-js")();
const router = express.Router();
const mongoose = require('mongoose');

const monWed = require('../../options/mwClass');
const tueThu = require('../../options/tthClass');
const bye = require('../../options/bye');
const emojis = require('../../options/emojis');
const anotherVictim = require('../../options/anotherVictim');
const lucky = require('../../options/lucky');

const sat = monWed.concat(tueThu); 

// Load models
const Victim = require('../../models/Victim');


// post request
router.post('/', (req, res) => {
	

	// fyi, I did previously use Math.floor(Math.random() * x) but some felt the randomnes wasn't so random
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
		
		let mwVictim = '';

		let promiseSetup = new Promise((resolve, reject) => {
			
			// find the total number of victims in array
			Victim.aggregate([{ 
				$project: {mwVictims: {$size: "$mwVictims"}}  // swap out class
			}], (err, size) => {
				if (err) throw err;
				let arrSize = size[0].mwVictims;
				console.log('***** size', arrSize)  // swap out class
				let number = size[0].mwVictims;  // swap out class

				if(arrSize === 0){
					return res.status(200).send(
						{
							"text": 'Uh oh, no more victims. :cry: \n To get more victims enter `/victim reset`.'
						}
					)
				} 

				// retrieve a random number
				let singleVictim = randomNum.integer(1, number);
				console.log('***** singleVictim', singleVictim)

				// select victim in array
				Victim.aggregate([{
					$project: {mwVictims: {$arrayElemAt: ["$mwVictims", singleVictim-1]}}  // swap out class
				}]).exec((err, victim) => {
					// tada! random user
					mwVictim = victim[0].mwVictims  // swap out class
					console.log('***** victim 1', mwVictim);  // swap out class

					// delete victim in array
					Victim.updateOne({},{ $pull: {mwVictims: mwVictim} }, (err, res) => {  // swap out class
						console.log(`***** ${mwVictim} removed`)  // swap out class
					})

					resolve();
					if (err)  {
						reject();
					};
				})
			})
		});

		promiseSetup.then(() => {
			console.log('***** victim 2', mwVictim);  // swap out class
			
			return res.status(200).send(
				{
					"text": `_*${mwVictim}*_${luckyMsg} \n${byeMsg} \n${emoji}`,  // swap out class
					"attachments": [
							anotherVictim.mw  // swap out class
					]
				}
			)
		})
		.catch(err => console.log(err));
		
		return;
	}
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
		// first, delete all db
		mongoose.connection.dropCollection('victims', (err) => {
			console.log('\'victims\' collection has been removed.')
			if (err) throw err;
		});
		// second, reseed all db
		Victim.create({
			mwVictims: monWed,
			tthVictims: tueThu,
			satVictims: sat
		}, (err) => {
			if (err) throw err;
		});

		return res.status(200).send(
			{
				"text": "Victim list has been reset! \n Enter `/victim mw`, `/victim tth`, or `/victim sat` to begin new hunt."
			}
	)}
	// NOTE: clicking button
	// if(req.body.callback_id === 'hunt_victim_mw'){
	if(req.body.payload){
		const secondRequest = JSON.parse(req.body.payload);
		// console.log('**** 4', req.body.payload);
		// console.log('**** 5', req.body.payload.callback_id); 
		// console.log('**** 6', secondRequest.callback_id);

		if(secondRequest.callback_id === 'hunt_victim_mw'){
			



			let mwVictim = '';

			let promiseSetup = new Promise((resolve, reject) => {
				
				// find the total number of victims in array
				Victim.aggregate([{ 
					$project: {mwVictims: {$size: "$mwVictims"}}  // swap out class
				}], (err, size) => {
					if (err) throw err;
					let arrSize = size[0].mwVictims;
					console.log('***** size', arrSize)  // swap out class
					let number = size[0].mwVictims;  // swap out class

					if(arrSize === 0){
						return res.status(200).send(
							{
								"text": 'Uh oh, no more victims. :cry: \n To get more victims enter `/victim reset`.'
							}
						)
					} 
					// retrieve a random number
					let singleVictim = randomNum.integer(1, number);
					console.log('***** singleVictim', singleVictim)

					// select victim in array
					Victim.aggregate([{
						$project: {mwVictims: {$arrayElemAt: ["$mwVictims", singleVictim-1]}}  // swap out class
					}]).exec((err, victim) => {
						// tada! random user
						mwVictim = victim[0].mwVictims  // swap out class
						console.log('***** victim 1', mwVictim);  // swap out class

						// delete victim in array
						Victim.updateOne({},{ $pull: {mwVictims: mwVictim} }, (err, res) => {  // swap out class
							console.log(`***** ${mwVictim} removed`)  // swap out class
						})

						resolve();
						if (err)  {
							reject();
						};
					})
				})
			});

			promiseSetup.then(() => {
				console.log('***** victim 2', mwVictim);  // swap out class
				
				return res.status(200).send(
					{
						"text": `_*${mwVictim}*_${luckyMsg} \n${byeMsg} \n${emoji}`,  // swap out class
						"attachments": [
								anotherVictim.mw  // swap out class
						]
					}
				)
			})
			.catch(err => console.log(err));
			
			return;



			// return res.status(200).send(
			// 	{
			// 		"text": `_*${mwVictim}*_${luckyMsg} \n${byeMsg} \n${emoji}`,
			// 		"attachments": [
			// 			anotherVictim.mw
			// 		]
			// 	}
			// )



		
		}
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
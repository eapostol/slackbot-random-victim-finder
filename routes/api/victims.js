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

const sat = monWed.concat(tueThu);  // update if neccessary

// Load models
const Victim = require('../../models/Victim');

// post request
router.post('/', (req, res) => {

	// fyi, I did previously use Math.floor(Math.random() * x) but some felt the randomnes wasn't so random. therefore I am using random-js
	let byeMsg = bye[randomNum.integer(0, (bye.length)-1)];
	let luckyMsg = lucky[randomNum.integer(0, (lucky.length)-1)];
	let emoji = emojis[randomNum.integer(0, (emojis.length)-1)];
	
	const requestType = req.body.text;
	// console.log('**** 1', req)
	// console.log('**** 2', req.body);
	// console.log('**** 3', requestType);
	
	if(requestType === 'mw'){  // update if neccessary
		mwVictimSearch()
	}
	if(requestType === 'tth'){  // update if neccessary

		let tthVictim = '';

		let promiseSetup = new Promise((resolve, reject) => {
			
			// find the total number of victims in array
			Victim.aggregate([{ 
				$project: {tthVictims: {$size: "$tthVictims"}}  // update if neccessary
			}], (err, size) => {
				if (err) throw err;
				let number = size[0].tthVictims;  // update if neccessary
				console.log('***** victim pool size', number)  

				if(number === 0){
					return res.status(200).send(
						{
							"text": 'Uh oh, no more victims. :cry: \n To get more, enter `/victim reset`.'
						}
					)
				} 

				// retrieve a random number
				let singleVictim = randomNum.integer(1, number);
				console.log('***** random single victim', singleVictim)

				// select victim in array
				Victim.aggregate([{
					$project: {tthVictims: {$arrayElemAt: ["$tthVictims", singleVictim-1]}}  // update if neccessary
				}]).exec((err, victim) => {
					// tada! random user
					tthVictim = victim[0].tthVictims  // update if neccessary
					console.log('***** victim before promise', tthVictim);  // update if neccessary

					// delete victim in array
					Victim.updateOne({},{ $pull: {tthVictims: tthVictim} }, (err, res) => {  // update if neccessary
						console.log(`***** ${tthVictim} removed`)  // update if neccessary
					})

					resolve();
					if (err)  {
						reject();
					};
				})
			})
		});

		promiseSetup.then(() => {
			console.log('***** victim after promise', tthVictim);  // update if neccessary
			
			return res.status(200).send(
				{
					"text": `_*${tthVictim}*_${luckyMsg} \n${byeMsg} \n${emoji}`,  // update if neccessary
					"attachments": [
							anotherVictim.tth  // update if neccessary
					]
				}
			)
		})
		.catch(err => console.log(err));
		
		return;
	}
	if(requestType === 'sat'){  // update if neccessary
		
		let satVictim = '';  // update if neccessary

		let promiseSetup = new Promise((resolve, reject) => {
			
			// find the total number of victims in array
			Victim.aggregate([{ 
				$project: {satVictims: {$size: "$satVictims"}}  // update if neccessary
			}], (err, size) => {
				if (err) throw err;
				let number = size[0].satVictims;  // update if neccessary
				console.log('***** victim pool size', number)  

				if(number === 0){
					return res.status(200).send(
						{
							"text": 'Uh oh, no more victims. :cry: \n To get more, enter `/victim reset`.'
						}
					)
				} 

				// retrieve a random number
				let singleVictim = randomNum.integer(1, number);
				console.log('***** random single victim', singleVictim)

				// select victim in array
				Victim.aggregate([{
					$project: {satVictims: {$arrayElemAt: ["$satVictims", singleVictim-1]}}  // update if neccessary
				}]).exec((err, victim) => {
					// tada! random user
					satVictim = victim[0].satVictims  // update if neccessary
					console.log('***** victim before promise', satVictim);  // update if neccessary

					// delete victim in array
					Victim.updateOne({},{ $pull: {satVictims: satVictim} }, (err, res) => {  // update if neccessary
						console.log(`***** ${satVictim} removed`)  // update if neccessary
					})

					resolve();
					if (err)  {
						reject();
					};
				})
			})
		});

		promiseSetup.then(() => {
			console.log('***** victim after promise', satVictim);  // update if neccessary
			
			return res.status(200).send(
				{
					"text": `_*${satVictim}*_${luckyMsg} \n${byeMsg} \n${emoji}`,  // update if neccessary
					"attachments": [
							anotherVictim.sat  // update if neccessary
					]
				}
			)
		})
		.catch(err => console.log(err));
		
		return;

	}
	if(requestType === 'reset'){
		// first, delete all db
		mongoose.connection.dropCollection('victims', (err) => {
			console.log('\'victims\' collection has been removed.')
			if (err) throw err;
		});
		// second, reseed all db
		Victim.create({
			mwVictims: monWed,    // update if neccessary
			tthVictims: tueThu,    // update if neccessary
			satVictims: sat    // update if neccessary
		}, (err) => {
			if (err) throw err;
		});

		return res.status(200).send(
			{
				"text": "Victim list has been reset! \n Enter `/victim mw`, `/victim tth`, or `/victim sat` to begin new hunt."    // update if neccessary
			}
	)}

	// NOTE: when button is clicked on
	if(req.body.payload){
		const secondRequest = JSON.parse(req.body.payload);
		// console.log('**** 4', req.body.payload);
		// console.log('**** 5', req.body.payload.callback_id); 
		// console.log('**** 6', secondRequest.callback_id);

		if(secondRequest.callback_id === 'hunt_victim_mw'){  // update if neccessary
			mwVictimSearch()
		}
		if(secondRequest.callback_id === 'hunt_victim_tth'){    // update if neccessary
			let tthVictim = '';  // update if neccessary

			let promiseSetup = new Promise((resolve, reject) => {
				
				// find the total number of victims in array
				Victim.aggregate([{ 
					$project: {tthVictims: {$size: "$tthVictims"}}  // update if neccessary
				}], (err, size) => {
					if (err) throw err;
					let number = size[0].tthVictims;  // update if neccessary
					console.log('***** victim pool size', number)  

					if(number === 0){
						return res.status(200).send(
							{
								"text": 'Uh oh, no more victims. :cry: \n To get more, enter `/victim reset`.'
							}
						)
					} 

					// retrieve a random number
					let singleVictim = randomNum.integer(1, number);
					console.log('***** random single victim', singleVictim)

					// select victim in array
					Victim.aggregate([{
						$project: {tthVictims: {$arrayElemAt: ["$tthVictims", singleVictim-1]}}  // update if neccessary
					}]).exec((err, victim) => {
						// tada! random user
						tthVictim = victim[0].tthVictims  // update if neccessary
						console.log('***** victim before promise', tthVictim);  // update if neccessary

						// delete victim in array
						Victim.updateOne({},{ $pull: {tthVictims: tthVictim} }, (err, res) => {  // update if neccessary
							console.log(`***** ${tthVictim} removed`)  // update if neccessary
						})

						resolve();
						if (err)  {
							reject();
						};
					})
				})
			});

			promiseSetup.then(() => {
				console.log('***** victim after promise', tthVictim);  // update if neccessary
				
				return res.status(200).send(
					{
						"text": `_*${tthVictim}*_${luckyMsg} \n${byeMsg} \n${emoji}`,  // update if neccessary
						"attachments": [
							anotherVictim.tth  // update if neccessary
						]
					}
				)
			})
			.catch(err => console.log(err));
			
			return;
		}
		if(secondRequest.callback_id === 'hunt_victim_sat'){  // update if neccessary
			let satVictim = '';  // update if neccessary

			let promiseSetup = new Promise((resolve, reject) => {
				
				// find the total number of victims in array
				Victim.aggregate([{ 
					$project: {satVictims: {$size: "$satVictims"}}  // update if neccessary
				}], (err, size) => {
					if (err) throw err;
					let number = size[0].satVictims;  // update if neccessary
					console.log('***** victim pool size', number)  

					if(number === 0){
						return res.status(200).send(
							{
								"text": 'Uh oh, no more victims. :cry: \n To get more, enter `/victim reset`.'
							}
						)
					} 

					// retrieve a random number
					let singleVictim = randomNum.integer(1, number);
					console.log('***** random single victim', singleVictim)

					// select victim in array
					Victim.aggregate([{
						$project: {satVictims: {$arrayElemAt: ["$satVictims", singleVictim-1]}}  // update if neccessary
					}]).exec((err, victim) => {
						// tada! random user
						satVictim = victim[0].satVictims  // update if neccessary
						console.log('***** victim before promise', satVictim);  // update if neccessary

						// delete victim in array
						Victim.updateOne({},{ $pull: {satVictims: satVictim} }, (err, res) => {  // update if neccessary
							console.log(`***** ${satVictim} removed`)  // update if neccessary
						})

						resolve();
						if (err)  {
							reject();
						};
					})
				})
			});

			promiseSetup.then(() => {
				console.log('***** victim after promise', satVictim);  // update if neccessary
				
				return res.status(200).send(
					{
						"text": `_*${satVictim}*_${luckyMsg} \n${byeMsg} \n${emoji}`,  // update if neccessary
						"attachments": [
							anotherVictim.sat  // update if neccessary
						]
					}
				)
			})
			.catch(err => console.log(err));
			
			return;
		} else {
			return res.status(200).send(
				{
					"text": `Zoinks! \nSomething doesn't look right. \nPlease try again. \n${emoji}`
				}
			)
		}
	} else {
		return res.status(200).send(
			{
				"text": `Zoinks! \nSomething doesn't look right. \nPlease try again. \n${emoji}`
			}
		)
	}
});

function mwVictimSearch(){
	let mwVictim = '';  // update if neccessary

		let promiseSetup = new Promise((resolve, reject) => {
			
			// find the total number of victims in array
			// `.aggregate` is a mongoDB method
			Victim.aggregate([{ 
				$project: {mwVictims: {$size: "$mwVictims"}}  // update if neccessary
			}], (err, size) => {
				if (err) throw err;
				let number = size[0].mwVictims;  // update if neccessary
				console.log('***** victim pool size', number)  

				if(number === 0){
					return res.status(200).send(
						{
							"text": 'Uh oh, no more victims. :cry: \n To get more, enter `/victim reset`.'
						}
					)
				} 

				// retrieve a random number
				let singleVictim = randomNum.integer(1, number);
				console.log('***** random single victim', singleVictim)

				// select victim in array
				Victim.aggregate([{
					$project: {mwVictims: {$arrayElemAt: ["$mwVictims", singleVictim-1]}}  // update if neccessary
				}]).exec((err, victim) => {
					// tada! random user
					mwVictim = victim[0].mwVictims  // update if neccessary
					console.log('***** victim before promise', mwVictim);  // update if neccessary

					// delete victim in array
					Victim.updateOne({},{ $pull: {mwVictims: mwVictim} }, (err, res) => {  // update if neccessary
						console.log(`***** ${mwVictim} removed`)  // update if neccessary
					})

					resolve();
					if (err)  {
						reject();
					};
				})
			})
		});

		promiseSetup.then(() => {
			console.log('***** victim after promise', mwVictim);  // update if neccessary
			
			return res.status(200).send(
				{
					"text": `_*${mwVictim}*_${luckyMsg} \n${byeMsg} \n${emoji}`,  // update if neccessary
					"attachments": [
							anotherVictim.mw  // update if neccessary
					]
				}
			)
		})
		.catch(err => console.log(err));
		
		return;
};


module.exports = router;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VictimSchema = new Schema ({
	mwVictims: {
		type: [String], // array of strings
		required: true
	},
	tthVictims: {
		type: [String], // array of strings
		required: true
	},
	satVictims: {
		type: [String], // array of strings
		required: true
	}
})

module.exports = Victim = mongoose.model('victim', VictimSchema);  // creating a model called `victim` and adding in the `VictimSchema`

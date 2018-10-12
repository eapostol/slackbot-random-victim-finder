const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const VictimSchema = new Schema ({
	mwVictims: {  // TODO: update with the appropriate class name if needed
		type: [String], // array of strings
		required: true
	},
	tthVictims: {  // TODO: update with the appropriate class name if needed
		type: [String], // array of strings
		required: true
	},
	satVictims: {  // TODO: update with the appropriate class name if needed
		type: [String], // array of strings
		required: true
	}
})

module.exports = Victim = mongoose.model('victim', VictimSchema);  // creating a model/collection called `victim` and adding in the `VictimSchema`. mongo automatically appends 's' to this. 

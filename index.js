const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const victims = require('./routes/api/victims');

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config `.mongoURI` at the end grabs the value from the file
const db = require('./config/keys').mongoURI;

// connect to mongoDB 
// `{ useNewUrlParser: true }` gets rid of mongoDB deprecation warning
mongoose
	.connect(db, {useNewUrlParser: true})
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.log(err));

// use routes
app.use('/api/victims', victims);  


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(
	`Server Running on Port ${port}`
));
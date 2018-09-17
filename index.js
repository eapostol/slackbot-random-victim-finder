const express = require('express');
const bodyParser = require('body-parser');

const random = require('./routes/api/random');

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use routes
app.use('/api/random', random);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(
	`Server Running on Port ${port}`
));
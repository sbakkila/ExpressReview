const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const router = require('./router.js');

// middleware for body parsing and logging
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/puppies', router);


// this is our DEFAULT response, and remember that in Express ORDER MATTERS
app.use('*', (req, res, next) => {
    res.send('nothing matched i am very sad')
})



var server = app.listen(3000, () => {
    console.log('Server listening on port ', server.address().port)
})




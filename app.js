const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { db, Puppy } = require('./db');

const router = require('./router.js');

// middleware for body parsing and logging
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/puppies', router);


// this is our DEFAULT response, and remember that in Express ORDER MATTERS
// Turned into error middleware below
// app.use('*', (req, res, next) => {
//     res.send('nothing matched i am very sad')
// })

app.use((err, req, res, next) => {
    res.sendStatus(err.status)
})


db.sync({force: true})
    .then(() => {
        app.listen(3000, () => {
            console.log('Server listening on port 3000')
        })
    })


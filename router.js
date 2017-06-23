const router = require('express').Router()
    , models = require('./db')
    , Puppy = models.Puppy;

// gets all puppies
router.get('/', (req, res, next) => {
    Puppy.findAll()
    .then(puppyArray => {
        res.json(puppyArray)
    })
    .catch(next)
})

// post a puppy
router.post('/addAPuppy', (req, res, next) => {
    Puppy.create(req.body)
    .then(() => res.sendStatus(201))
    .catch(next)
})

// gets one puppy
router.get('/:id', (req, res, next) => {
    Puppy.findById(req.params.id)
    .then(res.send.bind(res)) //fancy way of not having to use callback fxn (use same mechanics of not having to pass args to next)
    .catch(next)                 // "regular" way of writing would be:
                                //  .then( retrievedPuppy => { res.json( retrievedPuppy ) }
})

// updates a puppy
router.put('/:id', (req, res, next) => {
    Puppy.update(req.body, {
        where: {id: req.params.id},
        returning: true //must set this to true in order to "return" updated instance to .then
    })
    .then( (updatedPuppy, affectedRows) => {
        //update promise resolves with two things:
        // 1. the updated instance
        // 2. the number of "rows" in db that were affected by update
        console.log(updatedPuppy);
        console.log(affectedRows); //What would this console.log?
        res.status(302).send(updatedPuppy)
    })
    .catch(next)
})

module.exports = router;

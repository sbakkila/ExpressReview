const router = require('express').Router()
    , models = require('./db')
    , Puppy = models.Puppy;

// gets all puppies
router.get('/', (req, res, next) => {
    Puppy.findAll()
    .then(result => {
        res.json(result)
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
    if(puppies[Number(req.params.id)]){
        res.send(puppies[Number(req.params.id)])
    } else {
        res.sendStatus(404)
    }
})
// updates a puppy
router.put('/:id', (req, res, next) => {
    if(puppies[Number(req.params.id)]){
        // reassign the puppy
        puppies[Number(req.params.id)] = req.body
        res.sendStatus(302)
    } else {
        res.sendStatus(404)
    }
})

// adds a puppy
router.post('/', (req, res, next) => {
    puppies.push(req.body)
    res.sendStatus(201) // 201 is created
})

module.exports = router;

const { Router } = require('express');
const router = Router();

router.route('/')
    .get((req, res) => res.send('Users Routes'))
    // .post()

router.route('/:id')
    //.get()
    //.put()
    //.delete()

module.exports = router;
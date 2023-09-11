const express = require('express');

const router = express.Router();

// const CRUDController = require('./controller');
// const CRUDMiddleware = require('./middleware');


router.route('/')
    .get(
        (req, res) => {

            res.status(200).json({
                message: 'CRUD Module Initial Route',
            });
        });

// router.route('/:id')
//     .get()
//     .patch()
//     .delete();

module.exports = router;

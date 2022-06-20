// --------------------
// >> BASE VARIABLES <<
// --------------------
const express = require('express');
const router = express.Router();
const conn = require('../lib/db');
// --------------------


// --------------------
// >> GET ROUTE <<
// --------------------
router.get('/', (req, res, next) => {
    conn.query(
        `SELECT * FROM programs ORDER BY id`, (err, details) => {
            res.render('main_view', {
                item: details,
                my_session: req.session
            })
        }
        
    )
})
// --------------------


module.exports = router;
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
        `SELECT * FROM programs ORDER BY id`, (err, data) => {
            res.render('home_page', {
                programs: data
            })
        }
        
    )
})
// --------------------


module.exports = router;
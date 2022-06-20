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

    if (req.query.search) { 
        // search for name or voucher
        
        let queryString = 'SELECT bks.*, pgms.title FROM bookings bks, programs pgms WHERE bks.program_id = pgms.id'
        
        if (!parseInt(req.query.search)) {
            let names = req.query.search.split(" ")
            queryString += " AND bks.guest_first_nm LIKE '%" + names[0] + "%'"
            queryString += " AND bks.guest_last_nm LIKE '%" + (names[1] || '') + "%'"
        } else {
            queryString += " AND bks.voucher_number = " + parseInt(req.query.search)
        }
        
        conn.query(
            queryString, (err, data) => {

                if(err){
                    console.log(err)
                }

                res.render('search', {
                    records: data,
                    my_session: req.session
                })
            }
        )
    } else {
        res.render('search', {
            records: [],
            my_session: req.session
        })
    } 
})
// --------------------

module.exports = router;
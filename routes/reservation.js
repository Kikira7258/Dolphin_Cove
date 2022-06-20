const express = require('express');
const router = express.Router();
const conn = require('../lib/db')


router.get('/', (req, res) => {
    res.render('reservation')
})


router.post('/', (req, res) => {
    let data = {
        user_id: req.user_id,
        program_id: req.program_id,
        hotel_id: req.hotel_id,
        voucher_number: req.voucher_number,
        group_size: req.group_size,
        guest_first_nm: req.guest_first_nm,
        guest_last_nm: req.guest_last_nm,
        booked_date: new Date(row[0].booked_date).toISOString().split('T')[0],
        start_date: new Date(row[0].start_date).toISOString().split('T')[0],
    }

    let sqlQuery = "INSERT INTO reservation SET ?"
    
    let vQuery = conn.query(sqlQuery, data, (err, result) => {
        if(err) throw err;
    })
})


module.exports = router;
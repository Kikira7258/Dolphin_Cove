// --------------------
// base variables
// --------------------
const express = require('express');
const router = express.Router();
const conn = require('../lib/db');
// --------------------


// --------------------
// GET ROUTE
// --------------------
// fect from database
router.get('/', (req, res, next) => {
    let qry = 'SELECT *, bks.id AS bookings_id FROM bookings bks, tour_comp tc, users urs, hotel htl, programs pgms WHERE bks.user_id = urs.id AND urs.tour_comp_id = tc.id AND bks.hotel_id = htl.id AND bks.program_id = pgms.id'

    if (!req.session.isMainCompany) {
        qry += ' AND tc.id = ' + req.session.tour_comp_id
    }
    
    conn.query(
        // links user to bookings, so we know which user made the booking
        qry,(err, data) => {
            if(err) {
                console.log(err)
                return res.redirect('/auth');
            } else {
                console.log(data)
                res.render('bookings', {
                    details: data,
                    my_session: req.session
                })
            }
 
        }
    )
})
// --------------------


// --------------------
// ADD || INSERT ROUTE
// --------------------
// get route || ADD
router.get('/add', (req, res, next) => {
    conn.query(
        'SELECT * FROM programs', (err, programs) => {
            if(err){
                console.log(err)
            } else {
                // Nested query starts here!!
                res.render('reservation', {
                    programs: programs
                })   
            }
        }
    )
})


router.post('/add', (req, res) => {
    
    conn.query(
        // get cost to calc total price
        'SELECT cost FROM programs WHERE id =' + req.body.program_id, (err, row) => {
            if(err){
                console.log(err)
            } else {

                const total_amount = parseInt(req.body.group_size) * parseInt(row[0].cost)

        // ----------
                const voucher = Date.now().toString().slice(-7);
                let data = {
                    user_id: req.body.user_id,
                    program_id: req.body.program_id,
                    hotel_id: req.body.hotel_id,
                    voucher_number: voucher,
                    total_amount: total_amount,
                    group_size: req.body.group_size,
                    guest_first_nm: req.body.guest_first_nm,
                    guest_last_nm: req.body.guest_last_nm,
                    start_date: new Date(req.body.start_date).toISOString().split('T')[0],
                }
            
                let sqlQuery = "INSERT INTO bookings SET ?"
                
                let vQuery = conn.query(sqlQuery, data, (err, result) => {
                    if(err) throw err;
                    res.redirect('/bookings')
                })
            }
        }
    )

})
// --------------------


// --------------------
// EDIT & UPDATE ROUTE
// --------------------
// get route || EDIT
router.get('/edit/:id', (req, res) => {
    conn.query('SELECT * FROM bookings bks, tour_comp tc, users urs, hotel htl WHERE bks.user_id = urs.id AND urs.tour_comp_id = tc.id AND bks.hotel_id = htl.id AND bks.id = ' + req.params.id, (err, row) => {
        if(err) {
            console.log(err)
        } else {
            console.log(row)

            res.render('edit_bookings_info', {
                bookings_id: req.params.id,
                user_id: row[0].user_id,
                program_id: row[0].program_id,
                hotel_id: row[0].hotel_id,
                voucher_number: row[0].voucher_number,
                group_size: row[0].group_size,
                guest_first_nm: row[0].guest_first_nm,
                guest_last_nm: row[0].guest_last_nm,
                booked_date: new Date(row[0].booked_date).toISOString().split('T')[0],
                start_date: new Date(row[0].start_date).toISOString().split('T')[0]
            })
        }
    })
})

// post route || UPDATE
router.post('/update/:id', (req, res, next) => {
    let sqlQuery = "UPDATE bookings SET user_id = " + req.body.user_id +
    ", program_id = " + req.body.program_id +
    ", hotel_id = " + req.body.hotel_id +
    ", voucher_number = " + req.body.voucher_number +
    ", group_size = " + req.body.group_size +
    ", start_date = '" + req.body.start_date +
    "', booked_date = '" + req.body.booked_date +
    "', guest_first_nm = '" + req.body.guest_first_nm +
    "', guest_last_nm = '" + req.body.guest_last_nm +
    "' WHERE id = " + req.params.id

        conn.query(sqlQuery, (err, rows) => {
            if(err) {
                console.log(err);
            } else {
                res.redirect('/bookings')
            }
        })
})
// --------------------


// --------------------
// DELETE ROUTE 
// --------------------
router.get('/delete/:id', (req, res) => {
    conn.query('DELETE FROM bookings WHERE id =' + req.params.id, (err, row) => {
        if(!err){
            res.redirect('/bookings')
        } else {
            console.log(err);
        }
    })
})
// --------------------



// --------------------
// >> EXPORT ROUTER <<
// --------------------
module.exports = router;
// --------------------
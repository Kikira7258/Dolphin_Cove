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
router.get('/', (req, res) => {
    res.render('auth', {
        message: {
            error: "",
            success: ""
        }, my_session: req.session
    })
})
// --------------------



// --------------------
// >> POST ROUTE <<
// --------------------
router.post('/', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    conn.query('SELECT * FROM users WHERE username = ? AND BINARY password = ?', [username, password], (err, rows, fields) => {
        console.log(rows.length);

        if(err || rows.length <= 0) {
            console.log(err);
            res.redirect('/auth')
        } else {

            conn.query(
                'SELECT comp_name FROM tour_comp WHERE id = ' + rows[0].tour_comp_id,(err, result) => {
                    
                    // req.session.users = rows[0].id
                    req.session.isAuthenticated = true;
                    req.session.username = rows[0].username;
                    req.session.profile_img = rows[0].profile_img;
                    req.session.tour_comp_id = rows[0].tour_comp_id;
                    req.session.isMainCompany = result[0].comp_name === 'Dolphin Cove'
                    res.redirect('/programs');
                }
            )

        }
    })
})
// --------------------



// --------------------
// >> LOGOUT <<
// --------------------
router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})
// --------------------



// --------------------
// >> EXPORT ROUTER <<
// --------------------
module.exports = router;
// --------------------
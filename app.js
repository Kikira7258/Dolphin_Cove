// --------------------
// >> BASE VARIABLES <<
// --------------------
require('dotenv').config({path: './secrets.env'});
const express = require('express');
const conn = require('./lib/db');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

// >> Routes <<
const homepage = require('./routes/homepage');
const programs = require('./routes/programs');
const auth = require('./routes/auth');
const bookings = require('./routes/bookings');
const search = require('./routes/search');

// >> Protect Routes <<
const protect = require('./utils/protect')
// --------------------


// --------------------
// >> VIEW ENGINE AND STATIC FILES <<
// --------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')))
// --------------------


// --------------------
// >> CONFIG EXPRESS SERVER <<
// --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser());
// --------------------


// --------------------
// >> MIDDLEWEAR  SESSION <<
// --------------------
app.use(
    session({
        secret: 'theSecret',
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 15
        }
    })
)
// --------------------


// --------------------
// >> MIDDLEWEAR <<
// --------------------
app.use('/', homepage)
app.use('/programs', programs)
app.use('/auth', auth)
app.use('/bookings', bookings)
app.use('/search', search)
// --------------------


// --------------------
// >> GET ROUTES <<
// --------------------
app.get('/search', (req, res) => {
    res.render('search')
})
// --------------------


// --------------------
// >> PORT <<
// --------------------
const port = process.env.port || 8000
app.listen(port, () => console.log(`Listening on port: ${8000}`))
// --------------------
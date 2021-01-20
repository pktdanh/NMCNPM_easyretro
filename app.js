if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const exphbs  = require('express-handlebars')
const hbs_section = require('express-handlebars-sections')
const bodyParser = require('body-parser')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const app = express()
const port = process.env.PORT || 1000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.text())

app.engine('hbs', exphbs({
  extname: '.hbs',
  helpers: {
      section: hbs_section()
  }
}));
app.set('view engine', 'hbs');
const hbs = exphbs.create({})
require('./config/helper')(hbs)



app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

require('./config/passport_config')(passport)
 
app.use(passport.initialize())
app.use(passport.session())


const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Database connected'))



app.use('/',require('./routes/home.route'));
const loginRoute = require('./routes/login.route')(passport)
app.use('/login', loginRoute)
app.use('/dashboard',require('./routes/dashboard.route'));
app.use('/team',require('./routes/team.route'));
app.use('/publicboard',require('./routes/publicboard.route'));
app.use('/register',require('./routes/register.route'));
app.use('/profile',require('./routes/profile.route'));
app.use('/intergration',require('./routes/intergration.route'));
app.use('/analytic',require('./routes/analytic.route'));

app.use(function(req,res){
  res.render('404',{
      layout: false 
  });
})

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.render('500', {
      layout: false
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
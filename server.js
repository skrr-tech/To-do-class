const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const fs = require('fs');
const app = express();
const bcrypt = require('bcrypt');
const initPassport = require('./authentication/passport-config');
const db = require('./database/dbFuncs');
const port = 5000 || process.env.PORT;
const {
  isAuth,
  isNotAuth,
  checkDuplicate,
  checkValue,
} = require('./private/js/routeFuncs');
initPassport(passport, username =>
  db.readDb('database/accounts.txt').find(user => user.username === username)
);

app.use(express.json());
app.use(express.static('public'));
app.use(express.static('public/css'));
app.use(express.static('public/js'));
app.use(express.static('public/icons'));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', isNotAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'authentication', 'login.html'));
});

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login',
  })
);

app.get('/register', isNotAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'authentication', 'register.html'));
});

app.post('/register', isNotAuth, checkDuplicate, (req, res) => {
  const newData = {
    name: req.body.name,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
  };
  db.write(newData, 'database/accounts.txt');
  res.redirect('/login');
});

app.get('/admin', isAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'authentication', 'admin.html'));
});

app.get('/logout', isAuth, (req, res) => {
  req.logOut();
  res.redirect('/login');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/data', (req, res) => {
  fs.readFile('database/data.txt', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data.toString()));
  });
  // res.json(db.readDb('database/data.txt'));
});

app.put(
  '/data',
  (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    console.log('Someone unauthorized sent data');
    return res.status(401);
  },
  (req, res) => {
    fs.writeFileSync('database/data.txt', JSON.stringify(req.body), err => {
      if (err) throw err;
    });
    console.log('success');
  }
);

app.get('/private/js/admin.js', isAuth, (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'private', 'js', 'admin.js'));
});

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});

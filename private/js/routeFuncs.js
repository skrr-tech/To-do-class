const db = require('../../database/dbFuncs');

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/login');
}
function isNotAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/admin');
}
function checkDuplicate(req, res, next) {
  if (
    !db
      .readDb('database/accounts.txt')
      .find((user) => user.username === req.body.username)
  ) {
    return next();
  }
  return res.status(400).send({ message: 'Username is already taken' });
}
function checkValue(value, tagMode = false) {
  if (!tagMode) {
    if (value) {
      return value;
    }
    return 'Empty';
  }

  const res = { tag: {} };
  switch (value) {
    case 'Individual':
      res.tag.description = value;
      res.tag.url = 'w-1.png';
      res.tag.bgColor = 'bg-1';
      break;
    case 'Partner':
      res.tag.description = value;
      res.tag.url = 'w-2.png';
      res.tag.bgColor = 'bg-2';
      break;
    case 'Group':
      res.tag.description = value;
      res.tag.url = 'w-3+.png';
      res.tag.bgColor = 'bg-3+';
      break;
    default:
      res.tag.description = 'No data available';
    // res.tag.url = 'e.png';
    // res.tag.bgColor = 'bg-e';
  }
  return res;
}

module.exports.isAuth = isAuth;
module.exports.isNotAuth = isNotAuth;
module.exports.checkDuplicate = checkDuplicate;
module.exports.checkValue = checkValue;

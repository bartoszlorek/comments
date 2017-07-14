var bCrypt = require('bcrypt-nodejs');

module.exports = function (user, password) {
    return bCrypt.compareSync(password, user.password);
}
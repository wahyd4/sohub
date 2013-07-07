var User = require('../models/User.js');

var ActionService = {
    setDisplayName: function (nameId, newName, callback) {
        newName = newName.replace('=', '');
        newName = newName.trim();
        User.setName(nameId, newName, function (err, result) {
            if (err) callback(err);
            callback(null, result);
        });
    }

}

module.exports = ActionService;
var User = require('../models/User.js');

var ActionService = {
    setDisplayName: function (originalName, newName, callback) {
        originalName = originalName.replace('=', '');
        originalName = originalName.trim();
        User.setName(originalName, newName, function (err, result) {
            if (err) callback(err);
            callback(null, result);
        });
    }

}

module.exports = ActionService;
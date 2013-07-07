module.exports = {

    attributes: {

        name: 'STRING'

    },

    setName: function (oldName, newName, callback) {
        User.update({
            name: oldName
        }, {
            name: newName
        }).done(function (err, user) {
                if (err) {
                    User.create({
                        name: newName
                    }).done(function (err, user) {
                            if (err) callback(err);
                            callback(null, user);
                        });
                }
                callback(null, user);

            });
    }

};
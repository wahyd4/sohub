module.exports = {

    attributes: {
        nameId: 'STRING',
        name: 'STRING'

    },

    setName: function (nameId, newName, callback) {
        User.update({
            nameId: nameId
        }, {
            name: newName
        }, function (err, user) {
            if (err) {
                console.log('该用户以前没有创建用对象');
                User.create({
                    nameId: nameId,
                    name: newName
                }).done(function (err, user) {
                        if (err) callback(err);
                        callback(null, user);
                    });
            }
            callback(null, user);

        });
    },

    getNameByNameId: function (nameId, callback) {
        User.find({
            nameId: nameId
        }).done(function (err, user) {
                if (err) throw err;
                console.log(user);
                callback(err, user.name);
            });
    }

};
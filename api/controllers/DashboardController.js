var DashboardController = {
    view: function (req, res) {
        Message.findAll().done(function (err, messages) {
            if (err) return res.send(err,500);
            res.json(messages);
        });
    }

};
module.exports = DashboardController;
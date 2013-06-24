var DashboardController = {
    view: function (req, res) {
        res.view();
    },

    viewText: function (req, res) {
        Message.findAll().done(function (err, messages) {
            if (err) return res.send(err, 500);
            res.json(messages);
        });
    } ,

    viewImage: function(req,res){
        Image.findAll().done(function (err, messages) {
            if (err) return res.send(err, 500);
            res.json(messages);
        });
    }

};
module.exports = DashboardController;
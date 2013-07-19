var gcal = require('google-calendar');


var CalendarController = {
    index: function(req,res){
        var google_calendar = new gcal.GoogleCalendar(process.env.ACCESS_TOKEN);

//        google_calendar.calendarList.list(function(err, data) {
//            if(err) return res.send(500,err);
//            return res.json(data);
//        });
        google_calendar.events.list('wahyd4@gmail.com', function(err, data) {
            if(err) return res.send(500,err);
            return res.json(data);
        });
    }


};
module.exports = CalendarController;
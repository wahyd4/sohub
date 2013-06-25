$(document).ready(function () {
    $.get('/dashboard/image', function (json) {
        console.log('request success...');
    })
        .done(function (json) {
            console.log(json);
            var content = $('.content');
            for (var i = 0; i < json.length; i++) {
                $('figure').append('<img src="+json[i].pictureUrl+">').appendTo(content);

            }
        })
        .fail(function (error) {
            console.log('出错了！');
        });

});
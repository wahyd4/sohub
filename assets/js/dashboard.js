$(document).ready(function () {
    $.get('/dashboard/text', function (json) {
        console.log('request success...');
    })
        .done(function (json) {
            console.log(json);
            var content = $('.content');
            for (var i = 0; i < json.length; i++) {
                var item = $('<div class="item"></div>').append('<blockquote>'+json[i].content+'</blockquote>');
                content.append(item);
            }
        })
        .fail(function (error) {
            console.log('出错了！');
        });

});
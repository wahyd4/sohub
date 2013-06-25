$(document).ready(function () {
    $.get('/dashboard/image', function (json) {
        console.log('request success...');
    })
        .done(function (json) {
            console.log(json);
            var content = $('.content');
            for (var i = 0; i < json.length; i++) {
                var item = $('<figure></figure>').append('<img src="'+json[i].pictureUrl+'">');
                content.append(item);
            }
        })
        .fail(function (error) {
            console.log('出错了！');
        });

});
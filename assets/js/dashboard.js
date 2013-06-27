$(document).ready(function () {
    $.get('/dashboard/text', function (json) {
        console.log('request success...');
    })
        .done(function (json) {
            console.log(json);
            var content = $('.content');
            for (var i = 0; i < json.length; i++) {
                var item = $('<li class="alert"></li>');
                item.append('<blockquote>' + json[i].content + '</blockquote>');
                switch (i % 4) {
                    case 3:
                        item.addClass('alert-info');
                        break;
                    case 2:
                        item.addClass('alert-error');
                        break;
                    case 1:
                        item.addClass('alert-success');
                        break;
                    default:
                        break;

                }
                var footprint = $('<div></div>').addClass('footprint');
                footprint.append('<div>发送者：' + json[i].fromUser + '</div>');
                footprint.append('<div>发送于：' + json[i].createTime + '</div>');
                item.append(footprint);
                content.append(item);
            }

        })
        .fail(function (error) {
            console.log('出错了！');
        });

});
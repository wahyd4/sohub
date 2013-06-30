$(document).ready(function () {
    $.get('/dashboard/text', function (json) {
//        console.log('request success...');
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
                footprint.append('<div>发送于：' + timeSince(json[i].createTime) + '</div>');
                item.append(footprint);
                content.append(item);

            }

            var flag = 3;
            setInterval(function () {
                var children = content.children();
                if (flag >= children.length) {
                    //reset the flag to 0
                    flag = 0;
                }
                //hide all the children nodes
                for (var j = 0; j < children.length; j++) {
                    $(children[j]).hide();
                }
                //show the next children nodes
                for (var i = flag; i < flag + 3; i++) {
                    $(children[i]).show('slow');
                }
                //flag +3
                flag = flag + 3;

            }, 1000 * 10);

        })
        .fail(function (error) {
            console.log('出错了！');
        });

    //delay 1 minute to display images
    setTimeout(function () {
        $.get('/dashboard/image',function (json) {
            var imageContainer = $('.image-content');
            for (var i = 0; i < json.length; i++) {
                var item = $('<figure></figure>');
                item.append('<img src="' + json[i].pictureUrl + '">');
                imageContainer.append(item);

            }
        }).done(function () {
                $('.image-content').boxSlider({
                    speed: 1000, autoScroll: true, effect: 'tile3d'
                });
            });
    }, 1000 * 10);

});
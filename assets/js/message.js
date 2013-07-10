$(document).ready(function () {

    if (!assertOnPage('message')) {
        return false;
    }

    var interval = 1000 * 60;
    var nextChildToShow = 1;
    var textMessageCount = 2;

    /**
     * 为消息显示进度条
     */
    function processBar() {
        var flag = 1;
        var int = setInterval(function () {
            var bar = $('.bar');
            bar.css('width', flag + '%');
            flag += 100 / (interval / 1000);
            if (flag > 100 - 100 / (interval / 1000)) {
                bar.css('width', '100%');
                clearInterval(int);
                bar.css('width', '1%');
            }
        }, 1000);
    }

    /**
     * 循环显示不同类型的消息
     * @param interval
     * @param nextChildToShow
     */
    function cycling(interval, nextChildToShow) {
        setInterval(function () {
            var containers = $('.main-container').children();
            hideAllChildren('.main-container');
            var nextContainer = containers[nextChildToShow] || containers[0];
            $(nextContainer).show('slow');

            processBar();

            if (nextChildToShow === containers.length) {
                nextChildToShow = 0;
            }
            nextChildToShow++;
        }, interval);
    }

    cycling(interval, nextChildToShow);
    processBar();

    //get json
    $.get('/message/text', function (json) {
//        console.log('request success...');
    })
        .done(function (json) {
            console.log(json);
            var content = $('.text-content');
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

            var flag = textMessageCount;
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
                for (var i = flag; i < flag + textMessageCount; i++) {
                    $(children[i]).show('slow');
                }
                //flag +3
                flag = flag + textMessageCount;

            }, 1000 * 10);

        })
        .fail(function (error) {
            console.log('出错了！');
        });

    //delay 1 minute to display images
    setTimeout(function () {
        $.get('/message/image',function (json) {
            var imageContainer = $('.image-content');
            for (var i = 0; i < json.length; i++) {
                var item = $('<a href="#"></a>');
                item.append('<img src="' + json[i].pictureUrl + '">');
                imageContainer.append(item);

            }
        }).done(function () {

                $('.image-content').nivoSlider({
                    effect: 'random',
                    slices: 15,
                    boxCols: 8,
                    boxRows: 4,
                    animSpeed: 600,
                    pauseTime: 6000,
                    startSlide: 0,
                    directionNav: false,
                    controlNav: false,
                    controlNavThumbs: false,
                    pauseOnHover: false,
                    manualAdvance: false
                });
            });
    }, interval - 1000 * 30);

    // delay almost 2 minute to display notice message
    setTimeout(function () {
        $.get('/message/notice', function (json) {
            var noticeContainer = $('.notice-content');
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
                noticeContainer.append(item);

            }

            var flag_2 = textMessageCount;
            setInterval(function () {
                var children = noticeContainer.children();
                if (flag_2 >= children.length) {
                    flag_2 = 0;
                }
                hideAllChildren('.notice-content');
                //show the next children nodes
                for (var i = flag_2; i < flag_2 + textMessageCount; i++) {
                    $(children[i]).show('slow');
                }
                //flag_2 +3
                flag_2 = flag_2 + textMessageCount;

            }, 1000 * 10);
        });
    }, interval * 2 - 1000 * 30);

});
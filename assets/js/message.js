$(document).ready(function () {

    if (!assertOnPage('message')) {
        return false;
    }

    var interval = 1000 * 60;
    var nextChildToShow = 1;
    var textMessageCount = 1;
    var timeToShowNextMessage = 1000 * 5;

//    /**
//     * 为消息显示进度条
//     */
//    function processBar() {
//        var flag = 1;
//        var int = setInterval(function () {
//            var bar = $('.bar');
//            bar.css('width', flag + '%');
//            flag += 100 / (interval / 1000);
//            if (flag > 100 - 100 / (interval / 1000)) {
//                bar.css('width', '100%');
//                clearInterval(int);
//                bar.css('width', '1%');
//            }
//        }, 1000);
//    }

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

            if (nextChildToShow === containers.length) {
                nextChildToShow = 0;
            }
            nextChildToShow++;
        }, interval);
    }

    cycling(interval, nextChildToShow);

    $.get('/message/text', function (json) {
    })
        .done(function (json) {
            var content = $('.text-content');
            for (var i = 0; i < json.length; i++) {
                var item = $('<li style="display: none"></li>');

                var footprint = $('<div></div>').addClass('footprint');
                footprint.append('<img src="/images/elephant.jpg">');
                footprint.append('<div>' + json[i].fromUser + '发表于' + timeSince(json[i].createTime) + '</div>');
                item.append(footprint);

                if (i === 0) {
                    item.css('display', 'block');
                }
                item.append('<p>' + json[i].content + '</p>');
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

            }, timeToShowNextMessage);

            //hide the loading text
            $('#loading').hide();
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
//                    animSpeed: 600,
                    pauseTime: 5000,
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
                var item = $('<li style="display: none"></li>');

                var footprint = $('<div></div>').addClass('footprint');
                footprint.append('<img src="/images/elephant.jpg">');
                footprint.append('<div>' + timeSince(json[i].createTime) + '</div>');
                item.append(footprint);
                item.append('<p>' + json[i].content + '</p>');
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

            }, timeToShowNextMessage);
        });
    }, interval * 2 - 1000 * 30);

});
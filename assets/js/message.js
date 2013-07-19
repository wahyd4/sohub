$(document).ready(function () {

    if (!assertOnPage('message')) {
        return false;
    }

    var interval = 1000 * 60;
    var nextChildToShow = 1;
    var textMessageCount = 1;
    var timeToShowNextMessage = 1000 * 5;


    /**
     * 切换容器中的文字
     * @param container
     * @param flag 初始值
     */
    function slideDiv(container, flag) {
        var flag = flag || textMessageCount;
        setInterval(function () {
            var children = container.children();
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


            slideDiv(content);
            //hide the loading text
            $('#loading').hide();
        })
        .fail(function (error) {
            console.log('出错了！');
        });

    //delay 1 minute to display images
    setTimeout(function () {
        $.get('/message/image', function (json) {
            var imageContainer = $('.image-content');
            for (var i = 0; i < json.length; i++) {
                var item = $('<li></li>');
                item.append('<img src="' + json[i].pictureUrl + '">');
                imageContainer.append(item);

            }
            slideDiv(imageContainer, textMessageCount);

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
                footprint.append('<div>' + json[i].fromUser + '发表于' + timeSince(json[i].createTime) + '</div>');
                item.append(footprint);
                item.append('<p>' + json[i].content + '</p>');
                noticeContainer.append(item);

            }

            slideDiv(noticeContainer, textMessageCount);

        });
    }, interval * 2 - 1000 * 30);


    // delay almost 2.5 minute to display notice message
    setTimeout(function () {
        $.get('/weibo', function (json) {
            json = json.items;
            console.log(json);
            var weiboContainer = $('.weibo-content');
            for (var i = 0; i < json.length; i++) {
                var item = $('<li style="display: none"></li>');

                var footprint = $('<div></div>').addClass('footprint');
                footprint.append('<img src="' + json[i].user.avatar_hd + '">');
                footprint.append('<div>' + json[i].user.name + '发布于' + timeSince(new Date(json[i].created_at)) + '</div>');
                item.append(footprint);
                var content = $('<div class="weibo"> </div>');
                if (json[i].original_pic !== undefined) {
                    content.append('<img src="' + json[i].original_pic + '"></img>');
                }
                content.append('<p>' + json[i].text + '</p>');
                item.append(content);
                weiboContainer.append(item);

            }

            slideDiv(weiboContainer, textMessageCount);

        });
    }, interval * 3 - 1000 * 30);

    setTimeout(function () {
        $.get('/calendar', function (json) {
            console.log(json);
            json = json.items;
            var calendarContainer = $('.calendar-content');
            for (var i = 0; i < json.length; i++) {
                var item = $('<li style="display: none"></li>');

                var footprint = $('<div></div>').addClass('footprint');
                footprint.append('<img src="/images/elephant.jpg">');
                footprint.append('<div>' + json[i].organizer.displayName + '发布于' + timeSince(new Date(json[i].created)) + '</div>');
                item.append(footprint);
                var content = $('<div class="calendar"> </div>');
                content.append('<p>从' + json[i].start.dateTime + '到' + json[i].end.dateTime + '</p>')
                content.append('<p>' + json[i].summary + '</p>');
                item.append(content);
                calendarContainer.append(item);

            }

            slideDiv(calendarContainer, textMessageCount);

        });
    }, interval * 4 - 1000 * 30);

});
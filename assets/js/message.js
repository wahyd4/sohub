$(document).ready(function () {

    var interval = 1000 * 60;
    var nextChildToShow = 1;
    var textMessageCount = 4;

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
                    effect: 'random', // Specify sets like: 'fold,fade,sliceDown'
                    slices: 15, // For slice animations
                    boxCols: 8, // For box animations
                    boxRows: 4, // For box animations
                    animSpeed: 600, // Slide transition speed
                    pauseTime: 6000, // How long each slide will show
                    startSlide: 0, // Set starting Slide (0 index)
                    directionNav: false, // Next & Prev navigation
                    controlNav: false, // 1,2,3... navigation
                    controlNavThumbs: false, // Use thumbnails for Control Nav
                    pauseOnHover: false, // Stop animation while hovering
                    manualAdvance: false // Force manual transitions
                });
            });
    }, interval - 1000 * 30);

});
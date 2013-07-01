function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " 年前";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " 个月前";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " 天前";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " 小时前";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " 分钟前";
    }
    return Math.floor(seconds) + " 秒前";
}

/**
 *
 * 隐藏此对象的所有只节点
 * @param div jquery obj
 */
function hideAllChildren(div){
    var children = $(div).children();
    for (var j = 0; j < children.length; j++) {
        $(children[j]).hide();
    }
}
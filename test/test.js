var assert = require("assert");
var message = require('../api/models/message');

describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(5));
            assert.equal('hello sohub', 'hello' + ' sohub');
        });

        it('should return true to correct notice message', function () {
            assert.equal(message.isValidNoticeMessage('+你好'), true);
        });

        it('should update normal message to notice message', function () {
//            Message.create({
//                content: 'Test',
//                messageType: 'text'
//            }).done(function(err, msg){
//                    var temp = message.changeToNotice(msg._id);
//                    assert.equal(temp.messageType,'notice');
//            });
        });
    })
})
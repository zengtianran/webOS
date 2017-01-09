/**
 * Author      : ztr
 * CreateTime  : 2017/1/4
 * Description : ..
 * Copyright   :
 */
module.exports = function (webOS) {
  var _this = webOS;
  var _cardTpl = require('raw!./webos_info_card.html');
  var _renderCard = _this.template(_cardTpl, _this.config);
    _this.$html.after(_renderCard);
  var cardEl = $('.webos-card');
    cardEl.on('click', '.card-close', function (e) {
         var me = $(this);
          me.parent('.webos-card').fadeOut('300');
       return false;
    });
    //绑定拖动事件
    cardEl.on('mousedown', function (e) {
        var me = $(this);
        //鼠标位于屏幕的left
        var x = e.screenX;
        //鼠标位于屏幕的top
        var y = e.screenY;
        var sT = me.offset().top;
        var sL = me.offset().left;
        var lay = $(window);
        //绑定鼠标移动事件
        var moveHandle = function (e) {
            var eX = e.screenX;	//鼠标位于屏幕的left
            var eY = e.screenY;	//鼠标位于屏幕的top
            var lessX = eX - x;	//距初始位置的偏移量
            var lessY = eY - y;	//距初始位置的偏移量
            if (lessX == 0 && lessY == 0) {
                return false;
            }
            var _l = sL + lessX;
            var _t = sT + lessY;
            var _w = me.outerWidth();
            var _h = me.outerHeight();
            if (_t <= 10) {
                _t = 0;
            }
            //窗口贴屏幕左边10px内
            if (_l <= 10) {
                _l = 0;
            }
            //窗口贴屏幕右边10px内
            if (_l >= lay.width() - _w - 10) {
                _l = lay.width() - _w;
            }
            //窗口贴屏幕下边10px内
            // 60px 下方还有task-bar任务栏
            if (_t >= lay.height() - _h - 60 - 10) {
                _t = lay.height() - _h - 60;
            }
            me.css({
                left: _l,
                top: _t
            });
        };
        lay.on("mousemove", moveHandle);
        var mouseUpHandle = function () {
            lay.off("mousemove", moveHandle);
            lay.off("mouseup", mouseUpHandle);
        };
        lay.on("mouseup", mouseUpHandle);
    });
};
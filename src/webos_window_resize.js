//绑定窗口缩放事件
module.exports = function (webOS) {
    webOS.$html.on("mousedown", '.resize', function (e) {
        var $win = webOS.getWin($(this));
        var resizeType = $(this).data('type');
        var lay = $(window);
        var cy = e.clientY;
        var cx = e.clientX;
        var h = $win.height();
        var w = $win.width();
        webOS.GetLayOutBox().show();
        //鼠标移动事件处理
        var moveHandle = function (e) {
            var _t = e.clientY;
            var _l = e.clientX;
            //窗口贴屏幕顶部10px内
            if (_t <= 10) {
                _t = 0;
            }
            //窗口贴屏幕底部60px内
            if (_t >= (lay.height() - 60)) {
                _t = (lay.height() - 60);
            }

            if (_l <= 1) {
                _l = 1;
            }
            if (_l >= (lay.width() - 2)) {
                _l = (lay.width() - 2);
            }
            // $('.window-frame').children('div').hide();
            // obj.find('.window-frame').children('div').show();
            switch (resizeType) {
                case "t":
                    if (h + cy - _t > webOS.config.windowMinHeight) {
                        $win.css({
                            height: (h + cy - _t) + "px",
                            top: _t + "px"
                        });
                    }
                    break;
                case "r":
                    if (w - cx + _l > webOS.config.windowMinWidth) {
                        $win.css({
                            width: (w - cx + _l) + "px"
                        });
                    }
                    break;
                case "b":
                    if (h - cy + _t > webOS.config.windowMinHeight) {
                        $win.css({
                            height: (h - cy + _t) + "px"
                        });
                    }
                    break;
                case "l":
                    if (w + cx - _l > webOS.config.windowMinWidth) {
                        $win.css({
                            width: (w + cx - _l) + "px",
                            left: _l + "px"
                        });
                    }
                    break;
                case "rt":
                    if (h + cy - _t > webOS.config.windowMinHeight) {
                        $win.css({
                            height: (h + cy - _t) + "px",
                            top: _t + "px"
                        });
                    }
                    if (w - cx + _l > webOS.config.windowMinWidth) {
                        $win.css({
                            width: (w - cx + _l) + "px"
                        });
                    }
                    break;
                case "rb":
                    if (w - cx + _l > webOS.config.windowMinWidth) {
                        $win.css({
                            width: (w - cx + _l) + "px"
                        });
                    }
                    if (h - cy + _t > webOS.config.windowMinHeight) {
                        $win.css({
                            height: (h - cy + _t) + "px"
                        });
                    }
                    break;
                case "lt":
                    if (w + cx - _l > webOS.config.windowMinWidth) {
                        $win.css({
                            width: (w + cx - _l) + "px",
                            left: _l + "px"
                        });
                    }
                    if (h + cy - _t > webOS.config.windowMinHeight) {
                        $win.css({
                            height: (h + cy - _t) + "px",
                            top: _t + "px"
                        });
                    }
                    break;
                case "lb":
                    if (w + cx - _l > webOS.config.windowMinWidth) {
                        $win.css({
                            width: (w + cx - _l) + "px",
                            left: _l + "px"
                        });
                    }
                    if (h - cy + _t > webOS.config.windowMinHeight) {
                        $win.css({
                            height: (h - cy + _t) + "px"
                        });
                    }
                    break;
            }
            // ie6iframeheight();
            //更新窗口宽高缓存
            $win.data("info", {
                width: $win.width(),
                height: $win.height(),
                left: $win.offset().left,
                top: $win.offset().top,
                emptyW: $(window).width() - $win.width(),
                emptyH: $(window).height() - $win.height()
            });
        };
        lay.on("mousemove", moveHandle);
        //绑定鼠标抬起事件
        var mouseUpHandle = function () {
            webOS.GetLayOutBox().hide();
            // if($.browser.msie){
            //     _cache.MoveLayOut[0].releaseCapture();
            // }
            lay.off("mousemove",moveHandle);
            lay.off("mouseup",mouseUpHandle);
        };
        lay.on("mouseup", mouseUpHandle);
    });
};
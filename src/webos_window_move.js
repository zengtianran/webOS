//绑定窗口移动事件
module.exports = function (webOS) {
    webOS.$html.on("mousedown", ".title-bar", function (e) {
        var $win = webOS.getWin($(this));
        //改变窗口为选中样式
        webOS.$html.find('.window-container.window-current').removeClass('window-current');
        $win.addClass('window-current').css({
            'z-index': webOS.config.createIndexid
        });
        webOS.config.createIndexid += 1;
        var x = e.screenX;	//鼠标位于屏幕的left
        var y = e.screenY;	//鼠标位于屏幕的top
        var sT = $win.offset().top;
        var sL = $win.offset().left;
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
            //增加背景遮罩层
            webOS.GetLayOutBox().show();
            //强制把右上角还原按钮隐藏，最大化按钮显示
            $win.find(".ha-revert").hide().prev(".ha-max").show();
            var _l = sL + lessX;
            var _t = sT + lessY;
            var _w = $win.data("info").width;
            var _h = $win.data("info").height;
            /*
             //鼠标贴屏幕左侧20px内
             if(e.clientX <= 20){
             _w = (lay.width()/2)+"px";
             _h = "100%";
             _l = 0;
             _t = 0;
             }
             //鼠标贴屏幕右侧20px内
             if(e.clientX >= (lay.width()-21)){
             _w = (lay.width()/2)+"px";
             _h = "100%";
             _l = (lay.width()/2)+"px";
             _t = 0;
             }*/
            //窗口贴屏幕顶部10px内
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
            //窗口贴屏幕下边10px内 //60px 下方还有task-bar任务栏
            if (_t >= lay.height() - _h - 60 - 10) {
                _t = lay.height() - _h - 60;
            }
            /*
             //窗口贴屏幕底部60px内
             if(_t >= (lay.height()-60)){
             _t = (lay.height()-60)+"px";
             if(e.clientX <= 20){
             _w = (lay.width()/2)+"px";
             _h = "100%";
             _l = 0;
             _t = 0;
             }
             }*/
            $win.css({
                width: _w,
                height: _h,
                left: _l,
                top: _t
            });
            $win.data("info", {
                width: $win.data("info").width,
                height: $win.data("info").height,
                left: $win.offset().left,
                top: $win.offset().top,
                emptyW: $(window).width() - $win.data("info").width,
                emptyH: $(window).height() - $win.data("info").height
            });
            // ie6iframeheight();
        };
        lay.on("mousemove", moveHandle);
        //绑定鼠标抬起事件
        var mouseUpHandle = function () {
            webOS.GetLayOutBox().hide();
            $('.window-frame').children('div').show();
            $win.find('.window-frame').children('div').hide();
            lay.off("mousemove", moveHandle);
            lay.off("mouseup", mouseUpHandle);
        };
        lay.on("mouseup", mouseUpHandle);
    });
};
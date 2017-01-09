//最小化，最大化，还原，双击，关闭，刷新
module.exports = function (webOS) {
    //最小化
    webOS.$html.on("click", ".ha-min", function () {
        var $win = webOS.getWin($(this));
        var id = $win.data('id');
        //改变任务栏样式
        $('.task-window li[data-id="' + id + '"] b').removeClass('focus');
        $win.hide();
    });
    //最大化
    webOS.$html.on("click", ".ha-max", function () {
        var $win = webOS.getWin($(this));
        $win.css({
            width: "100%",
            height: "100%",
            top: 0,
            left: 0
        });
        $(this).hide().next(".ha-revert").show();
    });
    //还原
    webOS.$html.on("click", ".ha-revert", function () {
        var $win = webOS.getWin($(this));
        var winInfo = $win.data("info");
        $win.css({
            width: winInfo.width + "px",
            height: winInfo.height + "px",
            left: winInfo.left + "px",
            top: winInfo.top + "px"
        });
        $(this).hide().prev(".ha-max").show();
        // ie6iframeheight();
    });
    //双击
    webOS.$html.on("dblclick", ".title-bar", function () {
        //判断当前窗口是否已经是最大化
        if ($(this).find(".ha-max").is(":visible")) {
            $(this).find(".ha-max").trigger('click');
        } else {
            $(this).find(".ha-revert").trigger('click');
        }
    });
    //关闭
    function _winClose() {
        var me = $(this),
            parentCon = me.closest(".window-container"),
            _id = parentCon.data("id"),
            _iframe = parentCon.find('iframe'),
            _msgs = {};
            _msgs["type"] = "closeWin";
            _msgs["id"] = _id;
            _msgs["name"] = "关闭窗口";
        var _msgsStr = JSON.stringify(_msgs);
         _iframe[0].contentWindow.postMessage(_msgsStr, "*");
         webOS.winStatus = false;
        var _setTime = setTimeout(function () {
            if(!webOS.winStatus){
                webOS.closeWin(_id);
                _setTime = null;
            }
        }, 50);
        /*var $win = webOS.getWin($(this)),
            id = $win.data('id'),
            $winTask = $('.task-window li[data-id="' + id + '"]');
        var parentContainerEl = $(this).parents('.window-container'),
            _iframe = parentContainerEl.find('iframe'),
            _wind,
            _windEl;
        //处理同域是否关闭窗口
        try{
            _wind = _iframe[0].contentWindow;
            _windEl = _wind.frameElement;
        }catch (e){}
        //if(_windEl){
            if($.isFunction(_wind.onbeforeunload) && !_wind.onbeforeunload()){
                //不关闭重新写子窗体的close,
                _wind._close = _wind.close;
                _wind.close = function () {
                    $winTask.remove();
                    $win.remove();
                    webOS.visibleTaskBarBtn();
                };
                return false;
            }
        //}
        $winTask.remove();
        $win.remove();
        webOS.visibleTaskBarBtn();*/
    }
    webOS.$html.on("click", ".ha-close", function (e) {
        _winClose.call(this, e);
    });
    //是否刷新窗口
    function _freshWin() {
        var me = $(this),
            parentCon = me.closest(".window-container"),
            _id = parentCon.data("id"),
            _iframe = parentCon.find('iframe'),
            _msgs = {};
        _msgs["type"] = "freshWin";
        _msgs["id"] = _id;
        _msgs["name"] = "刷新窗口";
        var _msgsStr = JSON.stringify(_msgs);
        _iframe[0].contentWindow.postMessage(_msgsStr, "*");
        webOS.freshStatus = false;
        var _setTime = setTimeout(function () {
            if (webOS.freshStatus !==true ) {
                //不处理，强制刷新
                var $win = webOS.getWin(me);
                $win.find('iframe').attr("src", webOS.freshStatus ? webOS.freshStatus : $win.find('iframe').attr("src"));
                _setTime = null;
            }
        }, 50);
    }
    //刷新
    webOS.$html.on("click", ".ha-fresh", function (e) {
        _freshWin.call(this, e);
    });
    webOS.$html.on("click", ".refresh", function (e) {
         _freshWin.call(this, e);
    });
    //点击隐藏窗口遮罩
    webOS.$html.on("click", ".window-frame > div", function () {
        $(this).hide();
    });
    //激活
    webOS.$html.on('click', '.window-container:not(.window-current)', function () {
        var windowId = $(this).data('id');
        var options = webOS.getWindowOptions(windowId);
        webOS.open(options);
    });
};


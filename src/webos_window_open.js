//打开一个窗口
module.exports = function (options) {
    var webOS = this;
    //判断窗口是否已打开
    var isOpened = 0;
    $('.task-window li').each(function () {
        if ($(this).data('id') == options.id) {
            isOpened = 1;
            //改变任务栏样式
            $('.task-window li b').removeClass('focus');
            $(this).children('b').addClass('focus');
            //改变窗口样式
            $('.window-container').removeClass('window-current');
            webOS.windows[options.id].addClass('window-current').css({
                'z-index': webOS.config.createIndexid
            }).show();
            //改变窗口遮罩层样式
            $('.window-frame').children('div').show();
            webOS.windows[options.id].find('.window-frame').children('div').hide();
            webOS.config.createIndexid += 1;
        }
    });
    if (isOpened == 0) {
        var _win = $(window),
            _activeWin = $('div.window-current');
        //如果是页签打开
         if(options && options.type == 'OB'){
              _win[0].open(options.url, '_blank');
             return false;
         }
        //增加并显示背景遮罩层
        webOS.GetLayOutBox().show();
        //显示所有frame内的遮罩
        $('.window-frame').children('div').show();
        $('.task-window li b').removeClass('focus');
        $('.window-container').removeClass('window-current');
        if(!_activeWin.length){
            //居中显示窗口
            options.top = (_win.height() - options.height - 30) / 2 <= 0 ? 0 : (_win.height() - options.height - 30) / 2;
            options.left = (_win.width() - options.width) / 2 <= 0 ? 0 : (_win.width() - options.width) / 2;
        }else{
            //修改弹窗错开显示， 当前激活窗口的offSet；
            var  _activeWinLeft = _activeWin.offset().left,
                _activeWinTop = _activeWin.offset().top;
            options.top = _activeWinTop + 25;
            options.left = _activeWinLeft + 10;
            if((options.left + options.width) > _win.width() || (options.top + options.height + 20) > _win.height()){
                options.top = 5;
                options.left = 10;
            }
        }
        options.zIndex = webOS.config.createIndexid;
        options.emptyW = $(window).width() - options.width;
        options.emptyH = $(window).height() - options.height;
        //新增任务栏
        $('.task-window').append('<li data-id="' + options.id + '"><b class="focus"><img src="' + options.icon + '"/><span>' + options.title + '</span></b></li>');
        //计算任务栏按钮
        webOS.visibleTaskBarBtn();
        //新增窗口
        var winTpl = require('raw!./webos_window.html');
        var $win = $(webOS.template(winTpl, options));
        //重置Options的宽/高如果全屏
        if(options.type == 'IB_FS'){
            $win.css({
                "top": 0,
                "left": 0,
                "width": '100%',
                "height": '100%',
                "z-index": options.zIndex
            });
            $win.find('.ha-revert').show().prev().hide();
        }else{
            $win.css({
                "top": options.top,
                "left": options.left,
                "width": options.width,
                "height": options.height,
                "z-index": options.zIndex
            });
        }
        //监听iframe加载事件（同域重新加载）
        /*$win.find('iframe').on('load', function (e) {
            var me = $(this),
                _w,
                _wEl;
            try{
                _w = me[0].contentWindow;
                _wEl = _w.frameElement;
            }catch (e){}
           // if(_wEl){
                var _title = _w.document.title || '';
                //第一次加载不读取
                if(!me.attr("data-firstload")){
                    me.attr("data-firstload", "1");
                }else{
                    webOS.setTitle(me, _title);
                }
          //  }
        });*/
        if (options.resize) {
            //添加窗口缩放模板
            var resizeHtml = '';
            var resizeArr = ["t", "r", "b", "l", "rt", "rb", "lt", "lb"];
            for (var i in resizeArr) {
                resizeHtml += '<div data-type="' + resizeArr[i] + '" class="resize resize-' + resizeArr[i] + '"></div>';
            }
            $win.find('.window-inner').append(resizeHtml);
        }
        $('#desk').append($win);
        $win.addClass('window-current');
        $win.data("info", options);
        //向窗口广播消息，页面处于webOS系统中
        var _niframe = $('body').find('.window-current').find('iframe'),
            _msgs = {};
        _msgs["type"] = "webOS";
        _msgs["id"] = options.id;
        _msgs["name"] = "OS系统";
        var _msgsStr = JSON.stringify(_msgs);
        setTimeout(function () {
            _niframe[0].contentWindow.postMessage(_msgsStr, "*");
        }, 500);
        webOS.config.createIndexid += 1;
        //隐藏背景遮罩层
        webOS.GetLayOutBox().hide();
        webOS.windows[options.id] = $win;
    }
};

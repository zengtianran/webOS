module.exports = function (webOS) {
    var _top = webOS.config.shortcutTop;
    var _left = webOS.config.shortcutLeft;
    var windowHeight = $("#desk").height();
    var windowWidth = $("#desk").width();
    var $shortCutBox = $("#desk").find('ul');
    var defaultHeight = Math.max(520,Math.floor(windowHeight * 0.8));
    var defaultWidth = Math.max(820,Math.floor(windowWidth * 0.7));
    //默认图标
    var defaultIcon = require('./images/icon.png');
    //显示图标
    for (var sc in webOS.shortcut) {
        var shortcutOption = webOS.shortcut[sc];
        shortcutOption.id = sc;
        shortcutOption.height = parseFloat(shortcutOption.height);
        shortcutOption.width = parseFloat(shortcutOption.width);
        if (!shortcutOption.height){
            shortcutOption.height = defaultHeight;
        }
        if (!shortcutOption.width){
            shortcutOption.width = defaultWidth;
        }
        if (!shortcutOption.icon){
            shortcutOption.icon = defaultIcon;
        }
        if (shortcutOption.resize == undefined){
            shortcutOption.resize = true;
        }
        //处理打开方式
        if (shortcutOption.type == undefined){
            shortcutOption.type = 'IB_NORMAL';
        }
        shortcutOption.top = _top;
        shortcutOption.left = _left;

        $shortCutBox.append('<li style="left:' + shortcutOption['left'] + 'px;top:' + shortcutOption['top'] + 'px" data-id="' + shortcutOption['id'] + '"><img src="' + shortcutOption['icon'] + '"><span title="' + shortcutOption['title'] + '">' + shortcutOption['title'] + '</span><em></em></li>');
        //每循环一个图标后，给top的偏移量加90px
        _top += 130;
        //当下一个图标的top偏移量大于窗口高度时，top归零，left偏移量加90px
        if (_top + webOS.config.shortcutTop + 110 > windowHeight) {
            _top = webOS.config.shortcutTop;
            _left += 106;
        }
    }
    //绑定快捷方式点击事件
    $shortCutBox.on('click', 'li', function () {
        var windowId = $(this).data('id');
        var options = webOS.getWindowOptions(windowId);
        webOS.open(options);
    });

    //窗口大小变化后重新排列桌面图标
    $(window).on('resize', function () {
        //由于图标不会太多，所以resize里的方法是对样式直接修改，当然也可以重建li
        _top = webOS.config.shortcutTop;
        _left = webOS.config.shortcutLeft;
        windowHeight = $("#desk").height();
        //循环ul，操作每一个li
        $shortCutBox.find("li").each(function () {
            $(this).css({
                "left": _left,
                "top": _top
            });
            _top += 130;
            if (_top + webOS.config.shortcutTop + 110 > windowHeight) {
                _top = webOS.config.shortcutTop;
                _left += 106;
            }
        });
        //智能修改每个窗口的定位
        $("#desk div.window-container").each(function () {
            var currentW = $(window).width() - $(this).width();
            var currentH = $(window).height() - $(this).height();
            var _l = $(this).data("info").left / $(this).data("info").emptyW * currentW >= currentW ? currentW : $(this).data("info").left / $(this).data("info").emptyW * currentW;
            _l = _l <= 0 ? 0 : _l;
            var _t = $(this).data("info").top / $(this).data("info").emptyH * currentH >= currentH ? currentH : $(this).data("info").top / $(this).data("info").emptyH * currentH;
            _t = _t <= 0 ? 0 : _t;
            $(this).css({
                "left": _l + "px",
                "top": _t + "px"
            });
        });
    });

    require('./webos_shortcut_context_menu')(webOS);
};
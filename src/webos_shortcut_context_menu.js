module.exports = function (webOS) {
    var $shortCutBox = $("#desk").find('ul');
    //按钮上右键屏蔽
    $shortCutBox.on('contextmenu', function (e) {
        if (!$(e.target).is('ul')) {
            $.smartMenu.hide();
            return false;
        }
    });
    //右键菜单
    $shortCutBox.parent().smartMenu(webOS.config.contextMenu);
};

/**
 * Created by Administrator on 2016/6/21.
 */
module.exports = function (config) {
    var _this = this;
    _this.config = {
        background: '',//背景图片
        shortcutTop: 40,		//快捷方式top初始位置
        shortcutLeft: 30,		//快捷方式left初始位置
        createIndexid: 1,		//z-index初始值
        windowMinWidth: 820,	//窗口最小宽度
        windowMinHeight: 520,		//窗口最小高度
        contextMenu: [[          //右键菜单
            {
                text: "刷新",
                //data:[...]
                func: function () {
                    location.reload();
                }
            }, {
                text: "显示桌面",
                func: function () {
                    _this.showDesktop();
                }
            }
        ]],
        shortcut: [ //桌面按钮
            {
                title: "标题",
                icon: "图标",
                url: "地址",
                type: "IB_NORMAL",   //窗口的打开方式IB_NORMAL：内置正常；IB_FS：内置全屏；IB_CUSTOM：内置自定义（宽高）；OB：浏览器页签
                height: 600,
                width: 800
            }
        ],
        userInfo : {
            avatar : "images/tmp1.jpg",
            name : "李宇春",
            type : "学生",
            school : "厦门市海沧双十中学",
            class : ["初一三班", "初一五班"]
        },
        pwd : {
          isPwd : false,
          submitUrl : ''
        },
        //退出按钮回调
        logout:function () {

        }
    };
    $.extend(_this.config, config);
    var doT = require('dot/doT');
    _this.template = function (tpl, data) {
        return doT.template(tpl)(data);
    };
    _this.winStatus = false;
    _this.freshStatus = false;
    _this.Utils = require('./utils');
    _this.shortcut = _this.config.shortcut;
    _this.windows = {};
    _this.container = require('raw!./webos.html');
    _this.$html = $(_this.template(_this.container, _this.config)).appendTo('body');
    _this.$html.after('<div class="webos-background" style="background-image:url(' + _this.config.background + ');" />');
    require('./css/main.less');
    require('./webos_smart_menu');
    //加载卡片
    require('./webos_info_card')(_this);
    //显示桌面
    _this.showDesktop = function () {
        $(".task-window li b").removeClass("focus");
        $("#desk ul").nextAll("div").hide();
    };
    //透明遮罩层
    var LayOutBox = null;
    _this.GetLayOutBox = function () {
        if (!LayOutBox) {
            LayOutBox = $('<div style="z-index:99999;display:none;cursor:default;background:none;height:100%;left:0;position:absolute;top:0;width:100%;filter:alpha(opacity=0);-moz-opacity:0;opacity:0"><div style="height:100%;width:100%"></div></div>');
            $(document.body).append(LayOutBox);
        }
        return LayOutBox;
    };
    // 桌面图标
    require('./webos_shortcut')(_this);
    // 任务栏
    require('./webos_taskbar')(_this);
    require('./webos_taskbar_operate')(_this);
    //获取窗口
    _this.getWin = function ($item) {
        return $item.parentsUntil('.window-container', '.window-inner').parent();
    };
    //关闭窗口定位顶层高亮
    _this.setActiveWin = function () {
      var windowsEl = $('.window-container'),
          _maxZindex = 0,
          _topEl = null;
        if(!windowsEl.length){
            return false;
        }
        $.each(windowsEl, function () {
            var me = $(this);
            if(parseInt(me.css('z-index')) > _maxZindex){
                _maxZindex = parseInt(me.css('z-index'));
                _topEl = me;
            }
        });
        _topEl.find('.window-frame').find('div').hide();
        _topEl.addClass('window-current').siblings('.window-container').removeClass('window-current');
    };
    //获取窗口信息
    _this.getWindowOptions = function (windowId) {
        return _this.shortcut[windowId];
    };
    //打开窗口
    _this.open = require('./webos_window_open');
    //窗口操作
    require('./webos_window_operate')(_this);
    require('./webos_window_move')(_this);
    require('./webos_window_resize')(_this);
    //开放接口
    require('./webos_open_plus')(_this);
    //IE下禁止选中
    document.body.onselectstart = document.body.ondrag = function () {
        return false;
    };
    //禁用右键菜单
    _this.$html.on('contextmenu', function () {
        $.smartMenu.hide();
        return false;
    });
    //初始化完成-显示桌面
    $('.bgloader').fadeOut('slow');
}
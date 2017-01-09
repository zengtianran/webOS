/**
 * Created by ztr on 2016/11/9.
 */
module.exports = function (webOS) {
    var _webOS = webOS;
    //重新设置窗口的title
    _webOS.setTitle = function (id, msg) {
        var _winContainer = $('div.window-current[data-id="'+ id +'"]'),
            _msg = msg || '';
        _winContainer.find('.title-info').html(_msg);
    };
    //关闭窗口
    _webOS.closeWin = function (id) {
        var _id = id,
            $win = $('div.window-current[data-id="'+ _id +'"]'),
            $winTask = $('.task-window li[data-id="' + _id + '"]');
        $winTask.remove();
        $win.remove();
        _webOS.visibleTaskBarBtn();
        //设置当前窗口
        _webOS.setActiveWin();
    };
    //这个接口主要是postMessage么给id获取当前窗口
    _webOS.getActiveWinId = function () {
        var _currentWin = $('div.window-current');
        return _currentWin.data("id");
    };
    //打开窗口
    _webOS.openWin = function (name, url) {
        var _options = {},
            _deskEl = $("#desk");
        _options["id"] = +new Date();
        _options["title"] = name;
        _options["url"] = url;
        _options["icon"] = require('./images/icon.png');
        _options["height"] = Math.min(700,Math.floor(_deskEl.height() * 0.8));
        _options["width"] = Math.min(1200,Math.floor(_deskEl.width() * 0.7));
        _options["resize"] = true;
        _webOS.open(_options);
    };
    //监听window的message事件(可处理跨域消息的传输)
    window.onmessage = function (e) {
        var _msgObj = e.data && JSON.parse(e.data) || {},
            _id = _msgObj.id ? _msgObj.id : _webOS.getActiveWinId();
        switch(_msgObj.type) {
            case 'noClose' :
                //不关闭窗口
                _webOS.winStatus = true;
                break;
            case 'closeWin' :
                //关闭窗口
                _webOS.closeWin(_id);
                break;
            case 'setTitle' :
                //重置窗口标题
                _webOS.setTitle(_id, _msgObj.name);
                break;
            case 'openWin' :
                //打开窗口
                var _name =  _msgObj.name || '',
                    _url = _msgObj.url || '';
                _webOS.openWin(_name, _url);
                break;
            case 'noFresh' :
                //不刷新窗口
                _webOS.freshStatus = true;
                break;
            case 'fresh' :
                //刷新制定
                _webOS.freshStatus = _msgObj.url;
                break;
        }
     };
};
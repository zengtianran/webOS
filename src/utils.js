/**
 * Created by ztr on 2016/10/27.
 */
require('./css/reset-dialog.less');
module.exports = {
    alert : function (msg) {
        var _alert = dialog({
            title: '提示',
            content: msg,
            ok: function () {}
        }).showModal();
        return _alert;
    },
    dialog : function (options) {
        var _dialog = dialog(options).showModal();
        return _dialog;
    },
    confirm : function (msg, okCallback, cancelCallback) {
        var _confirm = dialog({
            id : 'comfirm-dialog',
            title: '提示',
            content: msg,
            button: [
                {
                    value: "确定",
                    autofocus: true,
                    callback: function () {
                        okCallback && okCallback();
                    }
                },
                {
                    value: "取消",
                    callback: function () {
                        cancelCallback && cancelCallback();
                    }
                }
            ]
        }).showModal();
        return _confirm;
    },
    tips : function (msg, time) {
        var _tips = dialog({
            content: msg
        }).show();
        setTimeout(function () {
            _tips.close().remove();
        }, time || 3*1000);
    }
}
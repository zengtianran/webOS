module.exports = function (webOS) {
    //检测密码只能包含数子与字母,密码长度为6位-15位，必须包含数字和字母
    $.validator.addMethod("_password", function (value, element, param) {
        if (!value) {
            return true;
        }
        return value.length <= 15 && value.length >= 6 && /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(value);
    }, "密码长度为6位-15位，必须包含数字和字母");
    //绑定任务栏点击事件
    var $taskBar = $('#task-bar'),
        pwdTpl = require('raw!./pwd/updatepwd.html');
    require('./css/form.less');
    $taskBar.on('click', 'li', function () {
        var $btn = $(this);
        var windowId = $btn.data('id');
        if ($btn.find('.focus').length) {
            $btn.find('.focus').removeClass('focus');
            webOS.windows[windowId].hide();
            return;
        }
        var options = webOS.getWindowOptions(windowId);
        webOS.open(options);
    });
    //任务栏鼠标移入显示标题
    $taskBar.on('mouseenter mouseleave', 'li', function (e) {
        if(e.type === 'mouseenter'){
             dockTips.call(this);
        }else{
            $('#dock-tips-container').hide();
        }
    });
    function dockTips() {
      var _this = $(this),
          _thisOffset = _this.offset(),
          _dockTips = $('#dock-tips-container');
        if(!_dockTips.length){
           $('<div/>', {
               "id" : "dock-tips-container"
           }).append(_this.find('span').html()).css({
               "left" : (_thisOffset.left - (_this.find('span').width()/2) + 8),
               "top" : (_thisOffset.top - 34)
           }).appendTo('body').animate({top: (_thisOffset.top - 24)}, 500);
        }else {
            _dockTips.html(_this.find('span').html()).css({
                "left" : (_thisOffset.left - (_this.find('span').width()/2) + 8),
                "top" : (_thisOffset.top - 34)
            }).stop(true).show().animate({top: (_thisOffset.top - 24)}, 500);
        }
    };
    //开始菜单
    $('.startMenuBtn').on('click', function () {
        $("#start-menu").toggle();
        return false;
    });
    $('body').on('click', function () {
        if ($('#start-menu').is(':visible')) {
            $('#start-menu').hide();
        }
    });
    //开始菜单功能
    $('#start-menu').on('click', '.btn-show-desktop', function () {
        webOS.showDesktop();
    });
    $('#start-menu').on('click', '.btn-exit', function () {
        webOS.Utils.confirm('确定要退出吗？', function () {
            webOS.config.logout();
        });
    });
    //修改密码
    var _pwdValidate = null;
    $('#start-menu').on('click', '.btn-change-pwd', function () {
        $('#accountPassContainer').remove();
        var postUrl = (webOS.config.pwd && webOS.config.pwd.isPwd && webOS.config.pwd.submitUrl) ? webOS.config.pwd.submitUrl : 'account/password_do';
        webOS.Utils.dialog({
            id: "updatePwdForm",
            title : '修改密码',
            content : $(webOS.template(pwdTpl, {})),
            width:600,
            button: [
                {
                    value: '确定',
                    callback: function () {
                        if(!_pwdValidate.form()){
                            return false;
                        }
                        _ajax(postUrl, {
                            'oldCredential' : $('input[name="oldCredential"]').val(),
                            'newCredential' : $('input[name="newCredential"]').val()
                        }, function (r) {
                            if(r.status === 'OK'){
                                webOS.Utils.tips('修改成功');
                            }else{
                                webOS.Utils.tips(r.message);
                            }
                        });
                    },
                    autofocus: true
                },
                {
                    value: '取消',
                    callback: function () {

                    }
                }
            ],
            onshow : function () {
                var _conEl = $('#accountPassContainer');
                pwdValidate(_conEl);
                _conEl.on('keyup', function (e) {
                    if (e && e.keyCode == 13){
                        _conEl.parents('table').find('button').eq(1).trigger('click');
                    }
                });
            }
        });
    });
    function pwdValidate($form) {
        _pwdValidate = $form.find('form').validate({
            rules: {
                oldCredential: {
                    required:true,
                    minlength:6,
                    maxlength:16
                },
                newCredential: {
                    required: true,
                    _password: true,
                    minlength:6,
                    maxlength:16
                },
                renewCredential: {
                    required: true,
                    _password: true,
                    minlength:6,
                    maxlength:16,
                    equalTo: "input[name='newCredential']"
                }
            },
            messages: {
                oldCredential: {
                    required:"原密码不能为空",
                    minlength:"密码不能少于6个字符",
                    maxlength:"密码不能大于16个字符"
                },
                newCredential: {
                    required:"新密码不能为空",
                    minlength:"密码不能少于6个字符",
                    maxlength:"密码不能大于16个字符"
                },
                renewCredential: {
                    required:"请再次输入新密码",
                    minlength:"密码不能少于6个字符",
                    maxlength:"密码不能大于16个字符",
                    equalTo : "两次输入的密码不一致"
                }
            }
        });
    };
    function _ajax(url, data, callback) {
        $.ajax({
            url : url,
            type : 'POST',
            data : data,
            success : function (r) {
                callback && callback(r);
            }
        });
    }
};
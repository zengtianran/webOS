/**
 * Created by ztr on 2016/10/30.
 * 任务栏操作，上一页、下一页操作
 */
module.exports = function(webOS){
    var $taskBar = $('#task-bar');
    webOS.visibleTaskBarBtn = function (curEl) {
        var _taskMarginLeft = Math.abs(parseInt($taskBar.find(".task-window").css("margin-left"))),
            _otherWidth = countElementsWidth($taskBar.find('.task-bar-container').children().not(".task-window-container")),
            _tabsWidth = $taskBar.outerWidth(true) - _otherWidth;
        //上一页
        if(_taskMarginLeft > 0){
            $taskBar.find('.task-btn-left').css("visibility", "visible");
        }else{
            $taskBar.find('.task-btn-left').css("visibility", "hidden");
        }
        //下一页
        if($taskBar.find(".task-window").width() > _tabsWidth){
            //处理如果有多页下一页是否超出容器
             if(curEl && curEl.length){
                var nextLen = countElementsWidth($(curEl).nextAll());
                 if(nextLen < _tabsWidth){
                     $taskBar.find('.task-btn-right').css("visibility", "hidden");
                 }else{
                     $taskBar.find('.task-btn-right').css("visibility", "visible");
                 }
             }else {
                 $taskBar.find('.task-btn-right').css("visibility", "visible");
             }
        }else{
            $taskBar.find('.task-btn-right').css("visibility", "hidden");
        }
    };
    $taskBar.on('click', '.task-btn-left', function(){
        btnLeft();
       return false;
    });
    $taskBar.on('click', '.task-btn-right', function(){
        btnRight();
        return false;
    });
    //窗口改变重置按钮
    $(window).on('resize', function () {
       webOS.visibleTaskBarBtn();
    });
    //计算元素集宽度
    function countElementsWidth(els) {
        var count = 0;
        $(els).each(function() {
            var _me = $(this);
            count += _me.outerWidth(true);
        });
        return count;
    }
    function btnLeft() {
        var _taskMarginLeft = Math.abs(parseInt($(".task-window").css("margin-left"))),
            _otherWidth = countElementsWidth($taskBar.find('.task-bar-container').children().not(".task-window-container")),
            _tabsWidth = $taskBar.outerWidth(true) - _otherWidth;
         var _marginLeft = 0;
            var _curEl = $(".task-window").find("li:first"),
                n = 0;
            while (((n + $(_curEl).outerWidth(true)) <= _taskMarginLeft) && _curEl.length > 0) {
                n += $(_curEl).outerWidth(true);
                _curEl = $(_curEl).next()
            }
            n = 0;
            if (countElementsWidth($(_curEl).prevAll()) > _tabsWidth) {
                while ((n + $(_curEl).outerWidth(true)) < (_tabsWidth) && _curEl.length > 0) {
                    n += $(_curEl).outerWidth(true);
                    _curEl = $(_curEl).prev()
                }
                _marginLeft = countElementsWidth($(_curEl).prevAll());
            }
        $(".task-window").animate({
                marginLeft: 0 - _marginLeft + "px"
            },
            "fast","swing", function () {
               webOS.visibleTaskBarBtn();
            });
    }
    function btnRight() {
        var _taskMarginLeft = Math.abs(parseInt($(".task-window").css("margin-left"))),
            _otherWidth = countElementsWidth($taskBar.find('.task-bar-container').children().not(".task-window-container")),
            _tabsWidth = $taskBar.outerWidth(true) - _otherWidth;
        var _marginLeft = 0;
            var _curEl = $(".task-window").find("li:first"),
                n = 0;
            while (((n + $(_curEl).outerWidth(true)) <= _taskMarginLeft) && _curEl.length > 0) {
                n += $(_curEl).outerWidth(true);
                _curEl = $(_curEl).next()
            }
            n = 0;
            while ((n + $(_curEl).outerWidth(true)) < (_tabsWidth) && _curEl.length > 0) {
                n += $(_curEl).outerWidth(true);
                _curEl = $(_curEl).next()
            }
            _marginLeft = countElementsWidth($(_curEl).prevAll());
            if (_marginLeft > 0) {
                $(".task-window").animate({
                        marginLeft: 0 - _marginLeft + "px"
                    },
                    "fast", "swing", function () {
                       webOS.visibleTaskBarBtn(_curEl);
                    });
            }
    }
};
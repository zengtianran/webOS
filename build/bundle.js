/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "D:\\gitFile\\g-webOS/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by max.l on 2016/6/21.
	 */
	'use strict';
	
	window.WebOS = module.exports = __webpack_require__(/*! ./src/webos */ 1);

/***/ },
/* 1 */
/*!**********************!*\
  !*** ./src/webos.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/6/21.
	 */
	"use strict";
	
	module.exports = function (config) {
	    var _this = this;
	    _this.config = {
	        background: '', //背景图片
	        shortcutTop: 40, //快捷方式top初始位置
	        shortcutLeft: 30, //快捷方式left初始位置
	        createIndexid: 1, //z-index初始值
	        windowMinWidth: 820, //窗口最小宽度
	        windowMinHeight: 520, //窗口最小高度
	        contextMenu: [[//右键菜单
	        {
	            text: "刷新",
	            //data:[...]
	            func: function func() {
	                location.reload();
	            }
	        }, {
	            text: "显示桌面",
	            func: function func() {
	                _this.showDesktop();
	            }
	        }]],
	        shortcut: [//桌面按钮
	        {
	            title: "标题",
	            icon: "图标",
	            url: "地址",
	            type: "IB_NORMAL", //窗口的打开方式IB_NORMAL：内置正常；IB_FS：内置全屏；IB_CUSTOM：内置自定义（宽高）；OB：浏览器页签
	            height: 600,
	            width: 800
	        }],
	        userInfo: {
	            avatar: "images/tmp1.jpg",
	            name: "李宇春",
	            type: "学生",
	            school: "厦门市海沧双十中学",
	            "class": ["初一三班", "初一五班"]
	        },
	        pwd: {
	            isPwd: false,
	            submitUrl: ''
	        },
	        //退出按钮回调
	        logout: function logout() {}
	    };
	    $.extend(_this.config, config);
	    var doT = __webpack_require__(/*! dot/doT */ 2);
	    _this.template = function (tpl, data) {
	        return doT.template(tpl)(data);
	    };
	    _this.winStatus = false;
	    _this.freshStatus = false;
	    _this.Utils = __webpack_require__(/*! ./utils */ 3);
	    _this.shortcut = _this.config.shortcut;
	    _this.windows = {};
	    _this.container = __webpack_require__(/*! raw!./webos.html */ 5);
	    _this.$html = $(_this.template(_this.container, _this.config)).appendTo('body');
	    _this.$html.after('<div class="webos-background" style="background-image:url(' + _this.config.background + ');" />');
	    __webpack_require__(/*! ./css/main.less */ 6);
	    __webpack_require__(/*! ./webos_smart_menu */ 7);
	    //加载卡片
	    __webpack_require__(/*! ./webos_info_card */ 8)(_this);
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
	    __webpack_require__(/*! ./webos_shortcut */ 10)(_this);
	    // 任务栏
	    __webpack_require__(/*! ./webos_taskbar */ 13)(_this);
	    __webpack_require__(/*! ./webos_taskbar_operate */ 16)(_this);
	    //获取窗口
	    _this.getWin = function ($item) {
	        return $item.parentsUntil('.window-container', '.window-inner').parent();
	    };
	    //关闭窗口定位顶层高亮
	    _this.setActiveWin = function () {
	        var windowsEl = $('.window-container'),
	            _maxZindex = 0,
	            _topEl = null;
	        if (!windowsEl.length) {
	            return false;
	        }
	        $.each(windowsEl, function () {
	            var me = $(this);
	            if (parseInt(me.css('z-index')) > _maxZindex) {
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
	    _this.open = __webpack_require__(/*! ./webos_window_open */ 17);
	    //窗口操作
	    __webpack_require__(/*! ./webos_window_operate */ 19)(_this);
	    __webpack_require__(/*! ./webos_window_move */ 20)(_this);
	    __webpack_require__(/*! ./webos_window_resize */ 21)(_this);
	    //开放接口
	    __webpack_require__(/*! ./webos_open_plus */ 22)(_this);
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
	};

/***/ },
/* 2 */
/*!**********************!*\
  !*** ./~/dot/doT.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// doT.js
	// 2011-2014, Laura Doktorova, https://github.com/olado/doT
	// Licensed under the MIT license.
	
	(function() {
		"use strict";
	
		var doT = {
			version: "1.1.1",
			templateSettings: {
				evaluate:    /\{\{([\s\S]+?(\}?)+)\}\}/g,
				interpolate: /\{\{=([\s\S]+?)\}\}/g,
				encode:      /\{\{!([\s\S]+?)\}\}/g,
				use:         /\{\{#([\s\S]+?)\}\}/g,
				useParams:   /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
				define:      /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
				defineParams:/^\s*([\w$]+):([\s\S]+)/,
				conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
				iterate:     /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
				varname:	"it",
				strip:		true,
				append:		true,
				selfcontained: false,
				doNotSkipEncoded: false
			},
			template: undefined, //fn, compile template
			compile:  undefined, //fn, for express
			log: true
		}, _globals;
	
		doT.encodeHTMLSource = function(doNotSkipEncoded) {
			var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
				matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
			return function(code) {
				return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
			};
		};
	
		_globals = (function(){ return this || (0,eval)("this"); }());
	
		/* istanbul ignore else */
		if (typeof module !== "undefined" && module.exports) {
			module.exports = doT;
		} else if (true) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return doT;}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			_globals.doT = doT;
		}
	
		var startend = {
			append: { start: "'+(",      end: ")+'",      startencode: "'+encodeHTML(" },
			split:  { start: "';out+=(", end: ");out+='", startencode: "';out+=encodeHTML(" }
		}, skip = /$^/;
	
		function resolveDefs(c, block, def) {
			return ((typeof block === "string") ? block : block.toString())
			.replace(c.define || skip, function(m, code, assign, value) {
				if (code.indexOf("def.") === 0) {
					code = code.substring(4);
				}
				if (!(code in def)) {
					if (assign === ":") {
						if (c.defineParams) value.replace(c.defineParams, function(m, param, v) {
							def[code] = {arg: param, text: v};
						});
						if (!(code in def)) def[code]= value;
					} else {
						new Function("def", "def['"+code+"']=" + value)(def);
					}
				}
				return "";
			})
			.replace(c.use || skip, function(m, code) {
				if (c.useParams) code = code.replace(c.useParams, function(m, s, d, param) {
					if (def[d] && def[d].arg && param) {
						var rw = (d+":"+param).replace(/'|\\/g, "_");
						def.__exp = def.__exp || {};
						def.__exp[rw] = def[d].text.replace(new RegExp("(^|[^\\w$])" + def[d].arg + "([^\\w$])", "g"), "$1" + param + "$2");
						return s + "def.__exp['"+rw+"']";
					}
				});
				var v = new Function("def", "return " + code)(def);
				return v ? resolveDefs(c, v, def) : v;
			});
		}
	
		function unescape(code) {
			return code.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ");
		}
	
		doT.template = function(tmpl, c, def) {
			c = c || doT.templateSettings;
			var cse = c.append ? startend.append : startend.split, needhtmlencode, sid = 0, indv,
				str  = (c.use || c.define) ? resolveDefs(c, tmpl, def || {}) : tmpl;
	
			str = ("var out='" + (c.strip ? str.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ")
						.replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""): str)
				.replace(/'|\\/g, "\\$&")
				.replace(c.interpolate || skip, function(m, code) {
					return cse.start + unescape(code) + cse.end;
				})
				.replace(c.encode || skip, function(m, code) {
					needhtmlencode = true;
					return cse.startencode + unescape(code) + cse.end;
				})
				.replace(c.conditional || skip, function(m, elsecase, code) {
					return elsecase ?
						(code ? "';}else if(" + unescape(code) + "){out+='" : "';}else{out+='") :
						(code ? "';if(" + unescape(code) + "){out+='" : "';}out+='");
				})
				.replace(c.iterate || skip, function(m, iterate, vname, iname) {
					if (!iterate) return "';} } out+='";
					sid+=1; indv=iname || "i"+sid; iterate=unescape(iterate);
					return "';var arr"+sid+"="+iterate+";if(arr"+sid+"){var "+vname+","+indv+"=-1,l"+sid+"=arr"+sid+".length-1;while("+indv+"<l"+sid+"){"
						+vname+"=arr"+sid+"["+indv+"+=1];out+='";
				})
				.replace(c.evaluate || skip, function(m, code) {
					return "';" + unescape(code) + "out+='";
				})
				+ "';return out;")
				.replace(/\n/g, "\\n").replace(/\t/g, '\\t').replace(/\r/g, "\\r")
				.replace(/(\s|;|\}|^|\{)out\+='';/g, '$1').replace(/\+''/g, "");
				//.replace(/(\s|;|\}|^|\{)out\+=''\+/g,'$1out+=');
	
			if (needhtmlencode) {
				if (!c.selfcontained && _globals && !_globals._encodeHTML) _globals._encodeHTML = doT.encodeHTMLSource(c.doNotSkipEncoded);
				str = "var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : ("
					+ doT.encodeHTMLSource.toString() + "(" + (c.doNotSkipEncoded || '') + "));"
					+ str;
			}
			try {
				return new Function(c.varname, str);
			} catch (e) {
				/* istanbul ignore else */
				if (typeof console !== "undefined") console.log("Could not create a template function: " + str);
				throw e;
			}
		};
	
		doT.compile = function(tmpl, def) {
			return doT.template(tmpl, null, def);
		};
	}());


/***/ },
/* 3 */
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by ztr on 2016/10/27.
	 */
	'use strict';
	
	__webpack_require__(/*! ./css/reset-dialog.less */ 4);
	module.exports = {
	    alert: function alert(msg) {
	        var _alert = dialog({
	            title: '提示',
	            content: msg,
	            ok: function ok() {}
	        }).showModal();
	        return _alert;
	    },
	    dialog: (function (_dialog2) {
	        function dialog(_x) {
	            return _dialog2.apply(this, arguments);
	        }
	
	        dialog.toString = function () {
	            return _dialog2.toString();
	        };
	
	        return dialog;
	    })(function (options) {
	        var _dialog = dialog(options).showModal();
	        return _dialog;
	    }),
	    confirm: function confirm(msg, okCallback, cancelCallback) {
	        var _confirm = dialog({
	            id: 'comfirm-dialog',
	            title: '提示',
	            content: msg,
	            button: [{
	                value: "确定",
	                autofocus: true,
	                callback: function callback() {
	                    okCallback && okCallback();
	                }
	            }, {
	                value: "取消",
	                callback: function callback() {
	                    cancelCallback && cancelCallback();
	                }
	            }]
	        }).showModal();
	        return _confirm;
	    },
	    tips: function tips(msg, time) {
	        var _tips = dialog({
	            content: msg
	        }).show();
	        setTimeout(function () {
	            _tips.close().remove();
	        }, time || 3 * 1000);
	    }
	};

/***/ },
/* 4 */
/*!***********************************!*\
  !*** ./src/css/reset-dialog.less ***!
  \***********************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 5 */
/*!***************************************!*\
  !*** ./~/raw-loader!./src/webos.html ***!
  \***************************************/
/***/ function(module, exports) {

	module.exports = "<div>\r\n    <div class=\"bgloader\"></div>\r\n    <div id=\"task-bar\">\r\n        <span class=\"startMenuBtn\">\r\n            <div class=\"task-bar-line\"></div>\r\n        </span>\r\n        <div id=\"task-bar-left\"></div>\r\n        <div id=\"task-bar-right\"></div>\r\n        <button class=\"task-btn task-btn-left\">\r\n            <i class=\"task-icon task-icon-left\"></i>\r\n        </button>\r\n         <div class=\"task-bar-container\">\r\n            <div class=\"task-window-container\">\r\n                <ul class=\"task-window\"></ul>\r\n            </div>\r\n         </div>\r\n        <button class=\"task-btn task-btn-right\">\r\n            <i class=\"task-icon task-icon-right\"></i>\r\n        </button>\r\n    </div>\r\n    <div id=\"desk\">\r\n        <ul></ul>\r\n    </div>\r\n    <div id=\"start-menu\">\r\n        <ul class=\"start-menu\">\r\n            {{? it.pwd && it.pwd.isPwd}}\r\n            <li class=\"btn-change-pwd\"><span>修改密码</span></li>\r\n            <li class=\"sep\"></li>\r\n            {{?}}\r\n            <li class=\"btn-show-desktop\"><span>显示桌面</span></li>\r\n            <li class=\"sep\"></li>\r\n            <li class=\"btn-exit\"><span>退出</span></li>\r\n        </ul>\r\n    </div>\r\n</div>"

/***/ },
/* 6 */
/*!***************************!*\
  !*** ./src/css/main.less ***!
  \***************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 7 */
/*!*********************************!*\
  !*** ./src/webos_smart_menu.js ***!
  \*********************************/
/***/ function(module, exports) {

	"use strict";
	
	(function ($) {
	    var D = $(document).data("func", {});
	    $.smartMenu = $.noop;
	    $.fn.smartMenu = function (data, options) {
	        var B = $("body"),
	            defaults = {
	            name: "",
	            offsetX: 2,
	            offsetY: 2,
	            textLimit: 6,
	            beforeShow: $.noop,
	            afterShow: $.noop
	        };
	        var params = $.extend(defaults, options || {});
	
	        var htmlCreateMenu = function htmlCreateMenu(datum) {
	            var dataMenu = datum || data,
	                nameMenu = datum ? Math.random().toString() : params.name,
	                htmlMenu = "",
	                htmlCorner = "",
	                clKey = "smart_menu_";
	            if ($.isArray(dataMenu) && dataMenu.length) {
	                htmlMenu = '<div id="smartMenu_' + nameMenu + '" class="' + clKey + 'box">' + '<div class="' + clKey + 'body">' + '<ul class="' + clKey + 'ul">';
	
	                $.each(dataMenu, function (i, arr) {
	                    if (i) {
	                        htmlMenu = htmlMenu + '<li class="' + clKey + 'li_separate">&nbsp;</li>';
	                    }
	                    if ($.isArray(arr)) {
	                        $.each(arr, function (j, obj) {
	                            var text = obj.text,
	                                htmlMenuLi = "",
	                                strTitle = "",
	                                rand = Math.random().toString().replace(".", "");
	                            if (text) {
	                                if (text.length > params.textLimit) {
	                                    text = text.slice(0, params.textLimit) + "…";
	                                    strTitle = ' title="' + obj.text + '"';
	                                }
	                                if ($.isArray(obj.data) && obj.data.length) {
	                                    htmlMenuLi = '<li class="' + clKey + 'li" data-hover="true">' + htmlCreateMenu(obj.data) + '<a href="javascript:" class="' + clKey + 'a"' + strTitle + ' data-key="' + rand + '"><i class="' + clKey + 'triangle"></i>' + text + '</a>' + '</li>';
	                                } else {
	                                    htmlMenuLi = '<li class="' + clKey + 'li">' + '<a href="javascript:" class="' + clKey + 'a"' + strTitle + ' data-key="' + rand + '">' + text + '</a>' + '</li>';
	                                }
	
	                                htmlMenu += htmlMenuLi;
	
	                                var objFunc = D.data("func");
	                                objFunc[rand] = obj.func;
	                                D.data("func", objFunc);
	                            }
	                        });
	                    }
	                });
	
	                htmlMenu = htmlMenu + '</ul>' + '</div>' + '</div>';
	            }
	            return htmlMenu;
	        },
	            funSmartMenu = function funSmartMenu() {
	            var idKey = "#smartMenu_",
	                clKey = "smart_menu_",
	                jqueryMenu = $(idKey + params.name);
	            if (!jqueryMenu.length) {
	                $("body").append(htmlCreateMenu());
	
	                //事件
	                $(idKey + params.name + " a").bind("click", function () {
	                    var key = $(this).attr("data-key"),
	                        callback = D.data("func")[key];
	                    if ($.isFunction(callback)) {
	                        callback.call(D.data("trigger"));
	                    }
	                    $.smartMenu.hide();
	                    return false;
	                });
	                $(idKey + params.name + " li").each(function () {
	                    var isHover = $(this).attr("data-hover"),
	                        clHover = clKey + "li_hover";
	
	                    $(this).hover(function () {
	                        var jqueryHover = $(this).siblings("." + clHover);
	                        jqueryHover.removeClass(clHover).children("." + clKey + "box").hide();
	                        jqueryHover.children("." + clKey + "a").removeClass(clKey + "a_hover");
	
	                        if (isHover) {
	                            $(this).addClass(clHover).children("." + clKey + "box").show();
	                            $(this).children("." + clKey + "a").addClass(clKey + "a_hover");
	                        }
	                    });
	                });
	                return $(idKey + params.name);
	            }
	            return jqueryMenu;
	        };
	
	        $(this).each(function () {
	            this.oncontextmenu = function (e) {
	                //回调
	                if ($.isFunction(params.beforeShow)) {
	                    params.beforeShow.call(this);
	                }
	                e = e || window.event;
	                //阻止冒泡
	                e.cancelBubble = true;
	                if (e.stopPropagation) {
	                    e.stopPropagation();
	                }
	                //隐藏当前上下文菜单，确保页面上一次只有一个上下文菜单
	                $.smartMenu.hide();
	                var st = D.scrollTop();
	                var jqueryMenu = funSmartMenu();
	                if (jqueryMenu) {
	                    jqueryMenu.css({
	                        display: "block",
	                        left: e.clientX + params.offsetX,
	                        top: e.clientY + st + params.offsetY
	                    });
	                    D.data("target", jqueryMenu);
	                    D.data("trigger", this);
	                    //回调
	                    if ($.isFunction(params.afterShow)) {
	                        params.afterShow.call(this);
	                    }
	                    return false;
	                }
	            };
	        });
	        if (!B.data("bind")) {
	            B.bind("click", $.smartMenu.hide).data("bind", true);
	        }
	    };
	    $.extend($.smartMenu, {
	        hide: function hide() {
	            var target = D.data("target");
	            if (target && target.css("display") === "block") {
	                target.hide();
	            }
	        },
	        remove: function remove() {
	            var target = D.data("target");
	            if (target) {
	                target.remove();
	            }
	        }
	    });
	})(jQuery);

/***/ },
/* 8 */
/*!********************************!*\
  !*** ./src/webos_info_card.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Author      : ztr
	 * CreateTime  : 2017/1/4
	 * Description : ..
	 * Copyright   :
	 */
	'use strict';
	
	module.exports = function (webOS) {
	    var _this = webOS;
	    var _cardTpl = __webpack_require__(/*! raw!./webos_info_card.html */ 9);
	    var _renderCard = _this.template(_cardTpl, _this.config);
	    _this.$html.after(_renderCard);
	    var cardEl = $('.webos-card');
	    cardEl.on('click', '.card-close', function (e) {
	        var me = $(this);
	        me.parent('.webos-card').fadeOut('300');
	        return false;
	    });
	    //绑定拖动事件
	    cardEl.on('mousedown', function (e) {
	        var me = $(this);
	        //鼠标位于屏幕的left
	        var x = e.screenX;
	        //鼠标位于屏幕的top
	        var y = e.screenY;
	        var sT = me.offset().top;
	        var sL = me.offset().left;
	        var lay = $(window);
	        //绑定鼠标移动事件
	        var moveHandle = function moveHandle(e) {
	            var eX = e.screenX; //鼠标位于屏幕的left
	            var eY = e.screenY; //鼠标位于屏幕的top
	            var lessX = eX - x; //距初始位置的偏移量
	            var lessY = eY - y; //距初始位置的偏移量
	            if (lessX == 0 && lessY == 0) {
	                return false;
	            }
	            var _l = sL + lessX;
	            var _t = sT + lessY;
	            var _w = me.outerWidth();
	            var _h = me.outerHeight();
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
	            //窗口贴屏幕下边10px内
	            // 60px 下方还有task-bar任务栏
	            if (_t >= lay.height() - _h - 60 - 10) {
	                _t = lay.height() - _h - 60;
	            }
	            me.css({
	                left: _l,
	                top: _t
	            });
	        };
	        lay.on("mousemove", moveHandle);
	        var mouseUpHandle = function mouseUpHandle() {
	            lay.off("mousemove", moveHandle);
	            lay.off("mouseup", mouseUpHandle);
	        };
	        lay.on("mouseup", mouseUpHandle);
	    });
	};

/***/ },
/* 9 */
/*!*************************************************!*\
  !*** ./~/raw-loader!./src/webos_info_card.html ***!
  \*************************************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"webos-card\">\r\n      <div class=\"card-close\">X</div>\r\n    <div class=\"thumbnail\">\r\n      <img src=\"{{=it.userInfo.avatar}}\">\r\n    </div>\r\n    <div class=\"content\">\r\n       <div><h3>{{=it.userInfo.name}}</h3><span>{{=it.userInfo.type}}</span></div>\r\n       <p>{{=it.userInfo.school}}</p>\r\n       <p>\r\n         {{for (var j = 0; j < it.userInfo.class.length; j++) { }}\r\n           <span>{{= it.userInfo.class[j]}}</span>\r\n         {{ } }}\r\n       </p>\r\n    </div>\r\n</div>"

/***/ },
/* 10 */
/*!*******************************!*\
  !*** ./src/webos_shortcut.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (webOS) {
	    var _top = webOS.config.shortcutTop;
	    var _left = webOS.config.shortcutLeft;
	    var windowHeight = $("#desk").height();
	    var windowWidth = $("#desk").width();
	    var $shortCutBox = $("#desk").find('ul');
	    var defaultHeight = Math.max(520, Math.floor(windowHeight * 0.8));
	    var defaultWidth = Math.max(820, Math.floor(windowWidth * 0.7));
	    //默认图标
	    var defaultIcon = __webpack_require__(/*! ./images/icon.png */ 11);
	    //显示图标
	    for (var sc in webOS.shortcut) {
	        var shortcutOption = webOS.shortcut[sc];
	        shortcutOption.id = sc;
	        shortcutOption.height = parseFloat(shortcutOption.height);
	        shortcutOption.width = parseFloat(shortcutOption.width);
	        if (!shortcutOption.height) {
	            shortcutOption.height = defaultHeight;
	        }
	        if (!shortcutOption.width) {
	            shortcutOption.width = defaultWidth;
	        }
	        if (!shortcutOption.icon) {
	            shortcutOption.icon = defaultIcon;
	        }
	        if (shortcutOption.resize == undefined) {
	            shortcutOption.resize = true;
	        }
	        //处理打开方式
	        if (shortcutOption.type == undefined) {
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
	
	    __webpack_require__(/*! ./webos_shortcut_context_menu */ 12)(webOS);
	};

/***/ },
/* 11 */
/*!*****************************!*\
  !*** ./src/images/icon.png ***!
  \*****************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 12 */
/*!********************************************!*\
  !*** ./src/webos_shortcut_context_menu.js ***!
  \********************************************/
/***/ function(module, exports) {

	'use strict';
	
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

/***/ },
/* 13 */
/*!******************************!*\
  !*** ./src/webos_taskbar.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
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
	        pwdTpl = __webpack_require__(/*! raw!./pwd/updatepwd.html */ 14);
	    __webpack_require__(/*! ./css/form.less */ 15);
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
	        if (e.type === 'mouseenter') {
	            dockTips.call(this);
	        } else {
	            $('#dock-tips-container').hide();
	        }
	    });
	    function dockTips() {
	        var _this = $(this),
	            _thisOffset = _this.offset(),
	            _dockTips = $('#dock-tips-container');
	        if (!_dockTips.length) {
	            $('<div/>', {
	                "id": "dock-tips-container"
	            }).append(_this.find('span').html()).css({
	                "left": _thisOffset.left - _this.find('span').width() / 2 + 8,
	                "top": _thisOffset.top - 34
	            }).appendTo('body').animate({ top: _thisOffset.top - 24 }, 500);
	        } else {
	            _dockTips.html(_this.find('span').html()).css({
	                "left": _thisOffset.left - _this.find('span').width() / 2 + 8,
	                "top": _thisOffset.top - 34
	            }).stop(true).show().animate({ top: _thisOffset.top - 24 }, 500);
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
	        var postUrl = webOS.config.pwd && webOS.config.pwd.isPwd && webOS.config.pwd.submitUrl ? webOS.config.pwd.submitUrl : 'account/password_do';
	        webOS.Utils.dialog({
	            id: "updatePwdForm",
	            title: '修改密码',
	            content: $(webOS.template(pwdTpl, {})),
	            width: 600,
	            button: [{
	                value: '确定',
	                callback: function callback() {
	                    if (!_pwdValidate.form()) {
	                        return false;
	                    }
	                    _ajax(postUrl, {
	                        'oldCredential': $('input[name="oldCredential"]').val(),
	                        'newCredential': $('input[name="newCredential"]').val()
	                    }, function (r) {
	                        if (r.status === 'OK') {
	                            webOS.Utils.tips('修改成功');
	                        } else {
	                            webOS.Utils.tips(r.message);
	                        }
	                    });
	                },
	                autofocus: true
	            }, {
	                value: '取消',
	                callback: function callback() {}
	            }],
	            onshow: function onshow() {
	                var _conEl = $('#accountPassContainer');
	                pwdValidate(_conEl);
	                _conEl.on('keyup', function (e) {
	                    if (e && e.keyCode == 13) {
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
	                    required: true,
	                    minlength: 6,
	                    maxlength: 16
	                },
	                newCredential: {
	                    required: true,
	                    _password: true,
	                    minlength: 6,
	                    maxlength: 16
	                },
	                renewCredential: {
	                    required: true,
	                    _password: true,
	                    minlength: 6,
	                    maxlength: 16,
	                    equalTo: "input[name='newCredential']"
	                }
	            },
	            messages: {
	                oldCredential: {
	                    required: "原密码不能为空",
	                    minlength: "密码不能少于6个字符",
	                    maxlength: "密码不能大于16个字符"
	                },
	                newCredential: {
	                    required: "新密码不能为空",
	                    minlength: "密码不能少于6个字符",
	                    maxlength: "密码不能大于16个字符"
	                },
	                renewCredential: {
	                    required: "请再次输入新密码",
	                    minlength: "密码不能少于6个字符",
	                    maxlength: "密码不能大于16个字符",
	                    equalTo: "两次输入的密码不一致"
	                }
	            }
	        });
	    };
	    function _ajax(url, data, callback) {
	        $.ajax({
	            url: url,
	            type: 'POST',
	            data: data,
	            success: function success(r) {
	                callback && callback(r);
	            }
	        });
	    }
	};

/***/ },
/* 14 */
/*!***********************************************!*\
  !*** ./~/raw-loader!./src/pwd/updatepwd.html ***!
  \***********************************************/
/***/ function(module, exports) {

	module.exports = "<div id=\"accountPassContainer\">\r\n    <form class=\"form-block\" autocomplete=\"off\" novalidate=\"novalidate\">\r\n        <div class=\"form-body\">\r\n            <div class=\"field-group default\">\r\n                <div class=\"field-group-title\">\r\n\r\n                </div>\r\n                <div class=\"field-row\">\r\n                    <div class=\"field\" data-index=\"0\">\r\n                        <label class=\"field-label\"> 原密码\r\n                            <span class=\"required\" aria-required=\"true\">*</span>\r\n                        </label>\r\n                        <div class=\"field-input-box\">\r\n                            <input name=\"oldCredential\" value=\"\" placeholder=\"\" class=\"field-input\" type=\"password\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"field-row\">\r\n                    <div class=\"field\" data-index=\"1\">\r\n                        <label class=\"field-label\"> 新密码\r\n                            <span class=\"required\" aria-required=\"true\">*</span>\r\n                        </label>\r\n                        <div class=\"field-input-box\">\r\n                            <input name=\"newCredential\" value=\"\" placeholder=\"\" class=\"field-input\" type=\"password\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"field-row\">\r\n                    <div class=\"field\" data-index=\"2\">\r\n                        <label class=\"field-label\"> 确认新密码\r\n                            <span class=\"required\" aria-required=\"true\">*</span>\r\n                        </label>\r\n                        <div class=\"field-input-box\">\r\n                            <input name=\"renewCredential\" value=\"\" placeholder=\"\" class=\"field-input\" type=\"password\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </form>\r\n</div>"

/***/ },
/* 15 */
/*!***************************!*\
  !*** ./src/css/form.less ***!
  \***************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 16 */
/*!**************************************!*\
  !*** ./src/webos_taskbar_operate.js ***!
  \**************************************/
/***/ function(module, exports) {

	/**
	 * Created by ztr on 2016/10/30.
	 * 任务栏操作，上一页、下一页操作
	 */
	"use strict";
	
	module.exports = function (webOS) {
	    var $taskBar = $('#task-bar');
	    webOS.visibleTaskBarBtn = function (curEl) {
	        var _taskMarginLeft = Math.abs(parseInt($taskBar.find(".task-window").css("margin-left"))),
	            _otherWidth = countElementsWidth($taskBar.find('.task-bar-container').children().not(".task-window-container")),
	            _tabsWidth = $taskBar.outerWidth(true) - _otherWidth;
	        //上一页
	        if (_taskMarginLeft > 0) {
	            $taskBar.find('.task-btn-left').css("visibility", "visible");
	        } else {
	            $taskBar.find('.task-btn-left').css("visibility", "hidden");
	        }
	        //下一页
	        if ($taskBar.find(".task-window").width() > _tabsWidth) {
	            //处理如果有多页下一页是否超出容器
	            if (curEl && curEl.length) {
	                var nextLen = countElementsWidth($(curEl).nextAll());
	                if (nextLen < _tabsWidth) {
	                    $taskBar.find('.task-btn-right').css("visibility", "hidden");
	                } else {
	                    $taskBar.find('.task-btn-right').css("visibility", "visible");
	                }
	            } else {
	                $taskBar.find('.task-btn-right').css("visibility", "visible");
	            }
	        } else {
	            $taskBar.find('.task-btn-right').css("visibility", "hidden");
	        }
	    };
	    $taskBar.on('click', '.task-btn-left', function () {
	        btnLeft();
	        return false;
	    });
	    $taskBar.on('click', '.task-btn-right', function () {
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
	        $(els).each(function () {
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
	        while (n + $(_curEl).outerWidth(true) <= _taskMarginLeft && _curEl.length > 0) {
	            n += $(_curEl).outerWidth(true);
	            _curEl = $(_curEl).next();
	        }
	        n = 0;
	        if (countElementsWidth($(_curEl).prevAll()) > _tabsWidth) {
	            while (n + $(_curEl).outerWidth(true) < _tabsWidth && _curEl.length > 0) {
	                n += $(_curEl).outerWidth(true);
	                _curEl = $(_curEl).prev();
	            }
	            _marginLeft = countElementsWidth($(_curEl).prevAll());
	        }
	        $(".task-window").animate({
	            marginLeft: 0 - _marginLeft + "px"
	        }, "fast", "swing", function () {
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
	        while (n + $(_curEl).outerWidth(true) <= _taskMarginLeft && _curEl.length > 0) {
	            n += $(_curEl).outerWidth(true);
	            _curEl = $(_curEl).next();
	        }
	        n = 0;
	        while (n + $(_curEl).outerWidth(true) < _tabsWidth && _curEl.length > 0) {
	            n += $(_curEl).outerWidth(true);
	            _curEl = $(_curEl).next();
	        }
	        _marginLeft = countElementsWidth($(_curEl).prevAll());
	        if (_marginLeft > 0) {
	            $(".task-window").animate({
	                marginLeft: 0 - _marginLeft + "px"
	            }, "fast", "swing", function () {
	                webOS.visibleTaskBarBtn(_curEl);
	            });
	        }
	    }
	};

/***/ },
/* 17 */
/*!**********************************!*\
  !*** ./src/webos_window_open.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	//打开一个窗口
	'use strict';
	
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
	        if (options && options.type == 'OB') {
	            _win[0].open(options.url, '_blank');
	            return false;
	        }
	        //增加并显示背景遮罩层
	        webOS.GetLayOutBox().show();
	        //显示所有frame内的遮罩
	        $('.window-frame').children('div').show();
	        $('.task-window li b').removeClass('focus');
	        $('.window-container').removeClass('window-current');
	        if (!_activeWin.length) {
	            //居中显示窗口
	            options.top = (_win.height() - options.height - 30) / 2 <= 0 ? 0 : (_win.height() - options.height - 30) / 2;
	            options.left = (_win.width() - options.width) / 2 <= 0 ? 0 : (_win.width() - options.width) / 2;
	        } else {
	            //修改弹窗错开显示， 当前激活窗口的offSet；
	            var _activeWinLeft = _activeWin.offset().left,
	                _activeWinTop = _activeWin.offset().top;
	            options.top = _activeWinTop + 25;
	            options.left = _activeWinLeft + 10;
	            if (options.left + options.width > _win.width() || options.top + options.height + 20 > _win.height()) {
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
	        var winTpl = __webpack_require__(/*! raw!./webos_window.html */ 18);
	        var $win = $(webOS.template(winTpl, options));
	        //重置Options的宽/高如果全屏
	        if (options.type == 'IB_FS') {
	            $win.css({
	                "top": 0,
	                "left": 0,
	                "width": '100%',
	                "height": '100%',
	                "z-index": options.zIndex
	            });
	            $win.find('.ha-revert').show().prev().hide();
	        } else {
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

/***/ },
/* 18 */
/*!**********************************************!*\
  !*** ./~/raw-loader!./src/webos_window.html ***!
  \**********************************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"window-container window-current\" data-id=\"{{=it.id}}\">\r\n    <div style=\"height: 100%;\" class=\"window-inner\">\r\n        <div class=\"title-bar\">\r\n            <img class=\"title-icon\" src=\"{{=it.icon}}\">\r\n            <span class=\"title-info\">{{=it.title}}</span>\r\n            <div class=\"title-handle\">\r\n                <a class=\"ha-fresh\" btn=\"fresh\" href=\"javascript:;\">刷新</a>\r\n                <a class=\"ha-min\" btn=\"hide\" href=\"javascript:;\">最小化</a>\r\n                <a class=\"ha-max\" btn=\"max\" href=\"javascript:;\">最大化</a>\r\n                <a class=\"ha-revert\" btn=\"revert\" href=\"javascript:;\" style=\"display:none\">还原</a>\r\n                <a class=\"ha-close\" btn=\"close\" href=\"javascript:;\">关闭</a>\r\n            </div>\r\n        </div>\r\n        <div class=\"window-frame\">\r\n            <div style=\"z-index:9000000;background:none;height:100%;position:absolute;width:100%;filter:alpha(opacity=0);-moz-opacity:0;opacity:0;display:none\"></div>\r\n            <iframe frameborder=\"0\" allowfullscreen=\"true\" src=\"{{=it.url}}\"></iframe>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ },
/* 19 */
/*!*************************************!*\
  !*** ./src/webos_window_operate.js ***!
  \*************************************/
/***/ function(module, exports) {

	//最小化，最大化，还原，双击，关闭，刷新
	"use strict";
	
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
	            if (!webOS.winStatus) {
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
	            if (webOS.freshStatus !== true) {
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

/***/ },
/* 20 */
/*!**********************************!*\
  !*** ./src/webos_window_move.js ***!
  \**********************************/
/***/ function(module, exports) {

	//绑定窗口移动事件
	"use strict";
	
	module.exports = function (webOS) {
	    webOS.$html.on("mousedown", ".title-bar", function (e) {
	        var $win = webOS.getWin($(this));
	        //改变窗口为选中样式
	        webOS.$html.find('.window-container.window-current').removeClass('window-current');
	        $win.addClass('window-current').css({
	            'z-index': webOS.config.createIndexid
	        });
	        webOS.config.createIndexid += 1;
	        var x = e.screenX; //鼠标位于屏幕的left
	        var y = e.screenY; //鼠标位于屏幕的top
	        var sT = $win.offset().top;
	        var sL = $win.offset().left;
	        var lay = $(window);
	        //绑定鼠标移动事件
	        var moveHandle = function moveHandle(e) {
	            var eX = e.screenX; //鼠标位于屏幕的left
	            var eY = e.screenY; //鼠标位于屏幕的top
	            var lessX = eX - x; //距初始位置的偏移量
	            var lessY = eY - y; //距初始位置的偏移量
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
	        var mouseUpHandle = function mouseUpHandle() {
	            webOS.GetLayOutBox().hide();
	            $('.window-frame').children('div').show();
	            $win.find('.window-frame').children('div').hide();
	            lay.off("mousemove", moveHandle);
	            lay.off("mouseup", mouseUpHandle);
	        };
	        lay.on("mouseup", mouseUpHandle);
	    });
	};

/***/ },
/* 21 */
/*!************************************!*\
  !*** ./src/webos_window_resize.js ***!
  \************************************/
/***/ function(module, exports) {

	//绑定窗口缩放事件
	'use strict';
	
	module.exports = function (webOS) {
	    webOS.$html.on("mousedown", '.resize', function (e) {
	        var $win = webOS.getWin($(this));
	        var resizeType = $(this).data('type');
	        var lay = $(window);
	        var cy = e.clientY;
	        var cx = e.clientX;
	        var h = $win.height();
	        var w = $win.width();
	        webOS.GetLayOutBox().show();
	        //鼠标移动事件处理
	        var moveHandle = function moveHandle(e) {
	            var _t = e.clientY;
	            var _l = e.clientX;
	            //窗口贴屏幕顶部10px内
	            if (_t <= 10) {
	                _t = 0;
	            }
	            //窗口贴屏幕底部60px内
	            if (_t >= lay.height() - 60) {
	                _t = lay.height() - 60;
	            }
	
	            if (_l <= 1) {
	                _l = 1;
	            }
	            if (_l >= lay.width() - 2) {
	                _l = lay.width() - 2;
	            }
	            // $('.window-frame').children('div').hide();
	            // obj.find('.window-frame').children('div').show();
	            switch (resizeType) {
	                case "t":
	                    if (h + cy - _t > webOS.config.windowMinHeight) {
	                        $win.css({
	                            height: h + cy - _t + "px",
	                            top: _t + "px"
	                        });
	                    }
	                    break;
	                case "r":
	                    if (w - cx + _l > webOS.config.windowMinWidth) {
	                        $win.css({
	                            width: w - cx + _l + "px"
	                        });
	                    }
	                    break;
	                case "b":
	                    if (h - cy + _t > webOS.config.windowMinHeight) {
	                        $win.css({
	                            height: h - cy + _t + "px"
	                        });
	                    }
	                    break;
	                case "l":
	                    if (w + cx - _l > webOS.config.windowMinWidth) {
	                        $win.css({
	                            width: w + cx - _l + "px",
	                            left: _l + "px"
	                        });
	                    }
	                    break;
	                case "rt":
	                    if (h + cy - _t > webOS.config.windowMinHeight) {
	                        $win.css({
	                            height: h + cy - _t + "px",
	                            top: _t + "px"
	                        });
	                    }
	                    if (w - cx + _l > webOS.config.windowMinWidth) {
	                        $win.css({
	                            width: w - cx + _l + "px"
	                        });
	                    }
	                    break;
	                case "rb":
	                    if (w - cx + _l > webOS.config.windowMinWidth) {
	                        $win.css({
	                            width: w - cx + _l + "px"
	                        });
	                    }
	                    if (h - cy + _t > webOS.config.windowMinHeight) {
	                        $win.css({
	                            height: h - cy + _t + "px"
	                        });
	                    }
	                    break;
	                case "lt":
	                    if (w + cx - _l > webOS.config.windowMinWidth) {
	                        $win.css({
	                            width: w + cx - _l + "px",
	                            left: _l + "px"
	                        });
	                    }
	                    if (h + cy - _t > webOS.config.windowMinHeight) {
	                        $win.css({
	                            height: h + cy - _t + "px",
	                            top: _t + "px"
	                        });
	                    }
	                    break;
	                case "lb":
	                    if (w + cx - _l > webOS.config.windowMinWidth) {
	                        $win.css({
	                            width: w + cx - _l + "px",
	                            left: _l + "px"
	                        });
	                    }
	                    if (h - cy + _t > webOS.config.windowMinHeight) {
	                        $win.css({
	                            height: h - cy + _t + "px"
	                        });
	                    }
	                    break;
	            }
	            // ie6iframeheight();
	            //更新窗口宽高缓存
	            $win.data("info", {
	                width: $win.width(),
	                height: $win.height(),
	                left: $win.offset().left,
	                top: $win.offset().top,
	                emptyW: $(window).width() - $win.width(),
	                emptyH: $(window).height() - $win.height()
	            });
	        };
	        lay.on("mousemove", moveHandle);
	        //绑定鼠标抬起事件
	        var mouseUpHandle = function mouseUpHandle() {
	            webOS.GetLayOutBox().hide();
	            // if($.browser.msie){
	            //     _cache.MoveLayOut[0].releaseCapture();
	            // }
	            lay.off("mousemove", moveHandle);
	            lay.off("mouseup", mouseUpHandle);
	        };
	        lay.on("mouseup", mouseUpHandle);
	    });
	};

/***/ },
/* 22 */
/*!********************************!*\
  !*** ./src/webos_open_plus.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by ztr on 2016/11/9.
	 */
	'use strict';
	
	module.exports = function (webOS) {
	    var _webOS = webOS;
	    //重新设置窗口的title
	    _webOS.setTitle = function (id, msg) {
	        var _winContainer = $('div.window-current[data-id="' + id + '"]'),
	            _msg = msg || '';
	        _winContainer.find('.title-info').html(_msg);
	    };
	    //关闭窗口
	    _webOS.closeWin = function (id) {
	        var _id = id,
	            $win = $('div.window-current[data-id="' + _id + '"]'),
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
	        _options["icon"] = __webpack_require__(/*! ./images/icon.png */ 11);
	        _options["height"] = Math.min(700, Math.floor(_deskEl.height() * 0.8));
	        _options["width"] = Math.min(1200, Math.floor(_deskEl.width() * 0.7));
	        _options["resize"] = true;
	        _webOS.open(_options);
	    };
	    //监听window的message事件(可处理跨域消息的传输)
	    window.onmessage = function (e) {
	        var _msgObj = e.data && JSON.parse(e.data) || {},
	            _id = _msgObj.id ? _msgObj.id : _webOS.getActiveWinId();
	        switch (_msgObj.type) {
	            case 'noClose':
	                //不关闭窗口
	                _webOS.winStatus = true;
	                break;
	            case 'closeWin':
	                //关闭窗口
	                _webOS.closeWin(_id);
	                break;
	            case 'setTitle':
	                //重置窗口标题
	                _webOS.setTitle(_id, _msgObj.name);
	                break;
	            case 'openWin':
	                //打开窗口
	                var _name = _msgObj.name || '',
	                    _url = _msgObj.url || '';
	                _webOS.openWin(_name, _url);
	                break;
	            case 'noFresh':
	                //不刷新窗口
	                _webOS.freshStatus = true;
	                break;
	            case 'fresh':
	                //刷新制定
	                _webOS.freshStatus = _msgObj.url;
	                break;
	        }
	    };
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
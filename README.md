# webOS
桌面风格的iframe管理器
##调用
```javascript
     new WebOS({
        //设置背景色
        background: "images/default.jpg",
        //退出地址
        logout:function() {
          location.href='/logout';
        },
        //是否启用修改密码入口
        pwd : {
            isPwd : true
        },
        //设置桌面图标
        shortcut: [
            {title: "智习课", icon: "images/icon.png", url: "http://www.baidu.com", width: 500, height: 500},
            {title: "教师管理", icon: "images/icon90.png", url: "http://www.baidu.com"},
            {title: "学生管理", icon: "images/icon89.png", url: "http://www.baidu.com"},
            {title: "浏览器页签", icon: "images/icon95.png", type: "OB", url: "http://www.baidu.com"},
            {title: "正常窗口", icon: "images/icon96.png", type: "IB_NORMAL", url: "http://www.baidu.com"},
            {title: "自定义窗口", icon: "images/icon97.png", type: "IB_CUSTOM", url: "http://www.baidu.com", width: 1450, height:330},
            {title: "全屏窗口", icon: "images/icon98.png", type: "IB_FS", url: "http://www.baidu.com"}
        ],
        //用户卡片信息
        userInfo : {
           avatar : "images/tmp1.jpg",
           name : "李宇春",
           type : "学生",
           school : "厦门市海沧双十中学",
           class : ["初一三班", "初一五班"]
       }
    });
```
###参数说明
  *background* >设置桌面背景
  -----------
  *shortcut*  >桌面图标
  -----------
 **shortcut** 属性说明
| Parameter       | Description
|-----------------|---------------
| title             | 设置应用描述
| icon              | 设置应用图标
| url               | 窗口的连接地址
| type              | 窗口打开类型：“OB”:浏览器页签；“IB_NORMAL”:正常窗口；“IB_CUSTOM”:打开自定义的窗口；“IB_FS”:全屏窗口打开
| width             | 窗口打开的宽度
| height            | 窗口打开的高度
------
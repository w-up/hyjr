var gui = require('nw.gui');
var win = gui.Window.get();

var $win = window;
win.show();

// var $nav = document.getElementsByClassName('header');
var $nav = document.getElementById('header_id');
// var $nav = document.body;
var dragging = false; //拖曳
var mouse_x, mouse_y;
var win_x, win_y;

// window.onload = function () {
//     alert(document.getElementById('header_id'));
// };

//鼠标拖动
document.getElementById('header_id').onmousedown = function (e) {
    e = e.originalEvent || e;
    var isbg = $(e.target).closest('.navbar-nav, #form-user').length < 1;
    if (!isbg) return;
    dragging = true;
    mouse_x = e.screenX;
    mouse_y = e.screenY;
    win_x = win.x;
    win_y = win.y
};

//鼠标移动时
window.onmousemove = function (e) {
    if (!dragging) return;
    win.x = win_x + (e.screenX - mouse_x);
    win.y = win_y + (e.screenY - mouse_y)
};

//鼠标放开
window.onmouseup = function () {
    dragging = false
};


// win.maximize(); 最大化GTK和Windows上的窗口，并在Mac OS X上缩放窗口。
// win.minimize(); 最小化Windows上任务栏的窗口，在GTK上图标化窗口，并在Mac OS X上小型化窗口。
// win.restore(); 窗口最小化后，将窗口恢复到之前的状态，即反向minimize()。unminimize由于restore常用，它没有命名。
// win.enterFullscreen(); 使窗口全屏。
//win.leaveFullscreen（）


//登录主页
function login_home() {
    win.setResizable(true);
    win.setMaximumSize(0, 0);  // 设置窗口的最大尺寸
    win.setMinimumSize(1280, 720);
    var x = (1280 - 700) / 2;
    var y = (720 - 350) / 2;
    win.moveBy(-x, -y);
    win.resizeTo(1280, 720);
    window.localStorage.setItem('set_dragging', '0');
}

//退出登录
function out_home() {
    win.setResizable(false);
    win.setMaximumSize(700, 350);
    win.setMinimumSize(700, 350);
    win.resizeTo(700, 350);
    win.setPosition('center');
}

//退出登录
function back_login() {
    win.setResizable(false);
    win.setMaximumSize(700, 350);
    win.setMinimumSize(700, 350);
    var x = (1280 - 700) / 2;
    var y = (720 - 350) / 2;
    win.moveBy(x, y);
    win.resizeTo(700, 350);
}

//最大化
function maximize_window() {
    win.maximize();
    window.localStorage.setItem('set_dragging', '1');
    // win.enterFullscreen();
}

//最小化
function minimize_window() {
    win.minimize();
    win.leaveFullscreen()
}

//还原
function restore_window() {
    win.restore();
    window.localStorage.setItem('set_dragging', '0');
    win.leaveFullscreen()
}

//关闭窗口
function close_window() {
    win.close(true);
}
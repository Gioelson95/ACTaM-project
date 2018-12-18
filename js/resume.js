/*--------------------mouse and keyboard event function--------------------*/

function mouseEvent(element, type) {
    dispatchMouseEvent(element, type);
};

function dispatchMouseEvent(target) {
    var e = document.createEvent("MouseEvents");
    e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
    target.dispatchEvent(e);
};

window.addEventListener('keydown', function (e) {
    var keyCode = keyCodeMap.get(e.keyCode);
    var key = document.getElementById(keyCode);
    if (!e.repeat && key != null) {
        mouseEvent(key, 'mousedown');
    }
});

window.addEventListener('keyup', function (e) {
    var keyCode = keyCodeMap.get(e.keyCode);
    var key = document.getElementById(keyCode);
    if (key != null) {
        mouseEvent(key, 'mouseup');
    }
});

"use strict";
/**
 *マウス/タップによるドラッグ操作ノード
 *
 * @class CloudNode
 */
var CloudNode = /** @class */ (function () {
    function CloudNode(node) {
        var _this = this;
        this.downFlag = false;
        this.downPos = { x: 0, y: 0 };
        this.basePos = { x: 0, y: 0 };
        this.node = node;
        node.addEventListener("mousedown", function (e) { return _this.mouseDown(e); });
        node.addEventListener("touchstart", function (e) { return _this.mouseDown(e); });
        window.addEventListener("mousemove", function (e) { return _this.mouseMove(e); });
        window.addEventListener("touchmove", function (e) { return _this.mouseMove(e); });
        window.addEventListener("mouseup", function () { return _this.mouseUp(); });
        window.addEventListener("touchend", function () { return _this.mouseUp(); });
    }
    CloudNode.convertPos = function (e) {
        var p = { x: 0, y: 0 };
        if ("targetTouches" in e) {
            var touch = e.targetTouches[0];
            p = { x: touch.pageX, y: touch.pageY };
        }
        else
            p = { x: e.clientX, y: e.clientY };
        return p;
    };
    CloudNode.prototype.mouseDown = function (e) {
        this.downFlag = true;
        this.downPos = CloudNode.convertPos(e);
        this.basePos = { x: this.node.offsetLeft, y: this.node.offsetTop };
    };
    CloudNode.prototype.mouseMove = function (e) {
        if (this.downFlag) {
            var p = CloudNode.convertPos(e);
            this.node.style.left = this.basePos.x + p.x - this.downPos.x + "px";
            this.node.style.top = this.basePos.y + p.y - this.downPos.y + "px";
        }
    };
    CloudNode.prototype.mouseUp = function () {
        this.downFlag = false;
    };
    CloudNode.prototype.getX = function () {
        return this.node.offsetLeft;
    };
    CloudNode.prototype.getY = function () {
        return this.node.offsetTop;
    };
    CloudNode.prototype.getWidth = function () {
        return this.node.clientWidth;
    };
    CloudNode.prototype.getHeight = function () {
        return this.node.clientHeight;
    };
    CloudNode.prototype.setPos = function (x, y) {
        this.node.style.left = x + "px";
        this.node.style.top = y + "px";
    };
    return CloudNode;
}());
/**
 *メイン動作
 *
 */
function Main() {
    var cloudNode = new CloudNode((document.querySelector("div:nth-child(1)")));
    cloudNode.setPos((window.innerWidth - cloudNode.getWidth()) / 2, (window.innerHeight - cloudNode.getHeight()) / 2);
    var count = 0;
    var typeNode = [];
    setInterval(function () {
        typeNode.forEach(function (node) {
            node.style.top = node.offsetTop + 2 + "px";
            if (node.offsetTop > document.body.clientWidth) {
                document.body.removeChild(node);
                typeNode.splice(typeNode.indexOf(node), 1);
            }
        });
        count++;
        if (count / 100 > 1) {
            count = Math.random() * 100;
            var node = document.createElement("div");
            node.innerText = Math.random() * 20 < 1 ? "肩" : "型";
            node.style.position = "absolute";
            node.style.fontSize = "3em";
            node.style.top = cloudNode.getY() + cloudNode.getHeight() - 20 + "px";
            node.style.left =
                cloudNode.getX() + Math.random() * cloudNode.getWidth() + "px";
            node.style.animation = "rot " + (Math.random() + 0.1) + "s linear infinite";
            document.body.appendChild(node);
            typeNode.push(node);
        }
    }, 1);
}
//DOMロード後に起動
addEventListener("DOMContentLoaded", Main);
//# sourceMappingURL=index.js.map
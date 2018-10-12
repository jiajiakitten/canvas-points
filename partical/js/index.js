var canvas = document.getElementById("canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
var context = canvas.getContext('2d');
var derection = true;
var dots1 = [];
var dots2 = [];
var dots3 = [];
focallength = 350;

var Dot = function (centerX, centerY, centerZ, radius) {
    this.dx = centerX;
    this.dy = centerY;
    this.dz = centerZ;
    this.tx = 0;
    this.ty = 0;
    this.tz = 0;
    this.z = centerZ;
    this.x = centerX;
    this.y = centerY;
    this.r = 100;
    this.g = 155;
    this.b = 55;
    this.radius = radius;
}
Dot.prototype = {
    paint: function () {
        context.save();
        context.beginPath();
        var scale = focallength / (focallength + this.z);
        context.arc(canvas.width / 2 + (this.x - canvas.width / 2) * scale, canvas.height / 2 + (this.y - canvas.height / 2) * scale, this.radius * scale, 0, 2 * Math.PI);
        // context.fillStyle = "rgba(250,250,250," + scale + ")";
        // console.log(`rgba(${this.r * scale},${this.r * scale},${this.r * scale},${scale})`);
        context.fillStyle = `rgba(${Math.random() * 10 + 100},${Math.random() * 10  + 200},${Math.random() * 10 + 100},${scale})`;
        context.fill();
        context.restore();
    }
}
Array.prototype.forEach = function(callback) {
    for (var i = 0; i < this.length; i++) {
        callback.call(this[i], i);
    }
}
function drawImg(imgObj, index) {
    context.save();
    var distance = 1;
    imgObj.onload = function(){
        switch (index) {
            case 1:
                context.drawImage(imgObj, 0, 0, imgObj.width, imgObj.height, 0, canvas.height / 2.4, imgObj.width / 2, imgObj.height / 2);
                break;
            case 2:
                distance = 4;
                context.drawImage(imgObj, 0, canvas.height - imgObj.height / 2, imgObj.width / 2, imgObj.height / 2);
                dots2 = getimgData(imgObj, distance);
                initAnimate(dots2);
                console.log(dots2, 'in2');
                break;
            case 3:
                distance = 1;
                context.drawImage(imgObj, canvas.width - imgObj.width / 1.3, canvas.height - imgObj.height / 1.3, imgObj.width / 1.3, imgObj.height / 1.3);
                dots3 = getimgData(imgObj, distance);
                console.log('+++++1');
                changePics(dots3, 3);
                break;
            default:
                break;
        }

    };
    context.restore();
}
function getimgData(imgObj, distance) {
    var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
    var dots = [];
    for (var x = 0; x < imgData.width; x += distance) {
        for (var y = 0; y < imgData.height; y += distance) {
            var i = (y * imgData.width + x) * 4;
            if (imgData.data[i] >= 128) {
                var dot = new Dot(x - 3, y - 3, 0, 1);
                dots.push(dot);
            }
        }
    }
    return dots;
}

// 定义初始点和目标点 都是散开的点
function initAnimate(dots) {
    dots.forEach(function() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * focallength * 2 - focallength;
        this.tx = Math.random() * canvas.width;
        this.ty = Math.random() * canvas.height;
        this.tz = Math.random() * focallength * 2 - focallength;
        this.paint();
    });
    animateToImg(dots);
}
// 设置点从图变成下一张图
function changePics(dots, index) {
    switch (index) {
        case 1: initAnimate(dots)
            break;
        case 2:
            dots.forEach(function(i) {
                if (dots1[i]) {
                    this.x = dots1[i].x;
                    this.y = dots1[i].x;
                    this.z = Math.random() * focallength * 2 - focallength;
                    this.tx = this.dx;
                    this.ty = this.dy;
                    this.tz = Math.random() * focallength * 2 - focallength;
                }
            });
            animateToImg(dots);
            break;
        case 3:
            // 图三的dots
            console.log('+++++2');
            dots.forEach(function(i) {
                this.x = dots2[i + 9].dx;
                this.y = dots2[i + 9].dy;
                this.z = dots2[i + 9].dz;
                this.tx = this.dx;
                this.ty = this.dy;
                this.tz = this.dz;
                this.paint();
            });
            console.log('+++++3');
            animateToImg(dots);
            break;
    }

}
// 定义动画
function animateToImg(dots) {
    var thisTime = +new Date();
    // var lastTime;
    context.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(function() {
        var dot = this;
        if (Math.abs(dot.dx - dot.x) < 0.1 && Math.abs(dot.dy - dot.y) < 0.1 && Math.abs(dot.dz - dot.z) < 0.1) {
            // 已经变成图片
            dot.x = dot.dx;
            dot.y = dot.dy;
            dot.z = dot.dz;
        } else {
            // 正在变成图片
            dot.x = dot.x + (dot.dx - dot.x) * 0.1;
            dot.y = dot.y + (dot.dy - dot.y) * 0.1;
            dot.z = dot.z + (dot.dz - dot.z) * 0.1;
            lastTime = +new Date()
        }
        dot.paint();
    });
    // 超过300ms变成图片, 变成false
    if (thisTime - lastTime <= 300) {
        if ("requestAnimationFrame" in window) {
            requestAnimationFrame(function(){
                animateToImg(dots)
            });
        }
        else if ("webkitRequestAnimationFrame" in window) {
            webkitRequestAnimationFrame(function(){
                animateToImg(dots)
            });
        }
        else if ("msRequestAnimationFrame" in window) {
            msRequestAnimationFrame(function(){
                animateToImg(dots)
            });
        }
        else if ("mozRequestAnimationFrame" in window) {
            mozRequestAnimationFrame(function(){
                animateToImg(dots)
            });
        }
    }
}


function drawPics(imgObj, index) {
    drawImg(imgObj, index);

}

function changePictures(imgObj, index) {
    drawImg(imgObj, index);
}
/**
 * Created by jess on 18/10/11.
 */

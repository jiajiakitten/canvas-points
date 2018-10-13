var canvas = document.getElementById("canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
var context = canvas.getContext('2d');
var derection = true;
var dots1 = [];
var dots2 = [];
var dots3 = [];
focallength = 100;

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
    this.r = 255;
    this.g = 255;
    this.b = 255;
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
        context.fillStyle = `rgba(${Math.random() * 10 + this.r},${Math.random() * 10  + this.r},${Math.random() * 10 + this.r},${Math.random() + 0.5})`;
        context.fill();
        context.restore();
    }
}
Array.prototype.forEach = function(callback) {
    for (var i = 0; i < this.length; i++) {
        callback.call(this[i], i);
    }
}
function drawImg(imgObjList, index) {
    context.save();
    var distance = 1;
    imgObjList[0].onload = function(){
        switch (index) {
            case 1:
                imgObjList[1].onload = function(){
                    console.log(imgObjList,index,  'imgObjList');
                    imgObjList[2].onload = function(){
                        var imgObj11 = imgObjList[0];
                        console.log(imgObj11, 'imgObj11');
                        var imgObj12 = imgObjList[1];
                        var imgObj13 = imgObjList[2];
                        context.drawImage(imgObj11, 0, canvas.height - imgObj11.height / 2, imgObj11.width / 2, imgObj11.height / 2);
                        // dots11 = getimgData(imgObj, distance);
                        // initAnimate(dots11);
                        // context.drawImage(imgObj, 0, canvas.height - imgObj.height / 2, imgObj.width / 2, imgObj.height / 2);
                        // dots12 = getimgData(imgObj, distance);
                        // initAnimate(dots12);
                        // context.drawImage(imgObj, 0, canvas.height - imgObj.height / 2, imgObj.width / 2, imgObj.height / 2);
                        // dots13 = getimgData(imgObj, distance);
                        // initAnimate(dots13);
                    }
                };

                break;
            case 2:
                var imgObj = imgObjList[0];
                distance = 4;    console.log(imgObj, '12');
                context.drawImage(imgObj, 0, canvas.height - imgObj.height / 2, imgObj.width / 2, imgObj.height / 2);
                dots2 = getimgData(imgObj, distance);
                initAnimate(dots2);
                console.log(dots2, 'in2');
                break;
            case 3:
                var imgObj = imgObjList[0];
                distance = 4;
                console.log(imgObj, '+++++1');
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(imgObj, canvas.width - imgObj.width / 1.3, canvas.height - imgObj.height / 1.3, imgObj.width / 1.3, imgObj.height / 1.3);
                // building dots
                dots3 = getimgData(imgObj, distance);
                // console.log(dots3, '+++++1');
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
            if (imgData.data[i] >= 10) {
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
            console.log(dots, dots2, '+++++22');
            var a = 0;
            dots2.forEach(function(i) {
                // if (a >= dots.length) a = i % dots.length;
                var dots2L = dots2.length;
                var dots3L = dots.length;
                let b = parseInt(dots2L / dots3L);
                // this.dx = dots[a].dx;
                // this.dy = dots[a].dy;
                // this.dz = dots[a].dz;
                if (i % b === 1 && dots[a]) {
                    this.dx = dots[a].dx;
                    this.dy = dots[a].dy;
                    this.dz = dots[a].dz;
                    a++;
                } else {
                    this.radius = 0;
                }
                this.paint();
            });
            console.log(dots, '+++++33');

            animateToImg(dots2);
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
    // if (thisTime - lastTime <= 300) {
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
    // }
}


function drawPics(imgObjList, index) {
    drawImg(imgObjList, index);

}

function changePictures(imgObj, index) {
    drawImg(imgObj, index);
}
/**
 * Created by jess on 18/10/11.
 */

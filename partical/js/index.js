var canvas = document.getElementById("canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
var context = canvas.getContext('2d');
var derection = true;
var dots11 = [];
var dots12 = [];
var dots13 = [];
var dots2 = [];
var dots3 = [];
var dotsList = [];
var dotsList2 = [];
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
    var distance = 3;
    imgObjList[0].onload = function(){
        switch (index) {
            case 1:
                imgObjList[1].onload = function(){
                    imgObjList[2].onload = function(){
                        var imgObj11 = imgObjList[0];
                        var imgObj12 = imgObjList[1];
                        var imgObj13 = imgObjList[2];
                        context.drawImage(imgObj11, canvas.width * 2 / 5 + 60, canvas.height * 2 / 5 - 10, imgObj11.width / 6, imgObj11.height / 6);
                        dots11 = getimgData(imgObj11, distance);
                        // initAnimate(dots11);
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(imgObj12, canvas.width * 2 / 5 + 130, canvas.height * 2 / 5 + 5, imgObj12.width / 6, imgObj12.height / 6);
                        dots12 = getimgData(imgObj, distance);
                        // initAnimate(dots12);
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(imgObj13, canvas.width * 2 / 5 + 70, canvas.height * 1 / 5 + 50, imgObj13.width / 6, imgObj13.height / 6);
                        dots13 = getimgData(imgObj, distance);
                        dotsList = dots11.concat(dots12, dots13);
                        initAnimate(dotsList);
                    }
                };

                break;
            case 2:
                var imgObj = imgObjList[0];
                distance = 4;
                console.log(imgObj, '12');
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(imgObj, 0, canvas.height - imgObj.height / 2, imgObj.width / 2, imgObj.height / 2);
                dots2 = getimgData(imgObj, distance);
                changePics(dots2, 2);
                break;
            case 3:
                var imgObj = imgObjList[0];
                distance = 4;
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(imgObj, canvas.width - imgObj.width / 1.3, canvas.height - imgObj.height / 1.3, imgObj.width / 1.3, imgObj.height / 1.3);
                // building dots
                dots3 = getimgData(imgObj, distance);
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
        this.x = Math.random() * 3;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * focallength * 2 - focallength;
        this.tx = Math.random() * 3;
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
            // 图二的dots
            // let be = dotsList.length;
            // let en = dots.length;
            // let b = 0;
            // var dotsList2 = dotsList.concat(dots.slice(be));
            // console.log(dotsList2, be, en);
            // dotsList2.forEach(function(i) {
            //     b = i;
            //     if (!dots[b]) {b = 0}
            //     this.dx = dots[b].dx;
            //     this.dy = dots[b].dy;
            //     this.dz = dots[b].dz;
            //     // this.paint();
            // });
            // animateToImg(dotsList2);

            let be = dotsList.length;
            let lastDots = dots.slice(be);
            var lastDotsL = lastDots.length;
            dotsList.forEach(function(i) {
                this.dx = dots[i].dx;
                this.dy = dots[i].dy;
                this.dz = dots[i].dz;
                this.paint();
            });
            lastDots.forEach(function(i) {
                this.x = dotsList[700].x;
                this.y = dotsList[700].y;
                this.z = dotsList[700].z;
                this.paint();
            });
            dotsList2 = dotsList.concat(lastDots);
            console.log(dotsList2);
            animateToImg(dotsList2);
            break;
        case 3:
            // 图三的dots
            var a = 0;
            dotsList2.forEach(function(i) {
                // if (a >= dots.length) a = i % dots.length;
                var dots2L = dotsList2.length;
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
            animateToImg(dotsList2);
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


function drawPics(imgObjList, index) {
    drawImg(imgObjList, index);

}

function changePictures(imgObj, index) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawImg(imgObj, index);
}
/**
 * Created by jess on 18/10/11.
 */

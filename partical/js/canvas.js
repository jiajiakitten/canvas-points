function drawPics(imgObj, index) {
    var canvas = document.getElementById("canvas");
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    var context = canvas.getContext('2d');
    focallength = 350;
    var derection = true;
    let dots = [];
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
    drawImg(imgObj, index);
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
                    dots = getimgData(imgObj, distance);
                    console.log(dots);
                    initAnimate(index);
                    break;
                case 3:
                    distance = 1;
                    context.drawImage(imgObj, canvas.width - imgObj.width / 1.3, canvas.height - imgObj.height / 1.3, imgObj.width / 1.3, imgObj.height / 1.3);
                    dots3 = getimgData(imgObj, distance);
                    initAnimate(index, dots3);
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

    function initAnimate(index, dots3) {
        console.log(1);
        dots.forEach(function(i) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.z = Math.random() * focallength * 2 - focallength;
            if (index !== 3) {
                this.tx = Math.random() * canvas.width;
                this.ty = Math.random() * canvas.height;
                this.tz = Math.random() * focallength * 2 - focallength;
            } else if (index === 3 && dots3[i]) {
                this.tx = dots3[i].x;
                this.tx = dots3[i].y;
                this.tx = dots3[i].z;
            }
            this.paint();
        });
        animate();
    }
    function animate() {
        var thisTime = +new Date();
        // var lastTime;
        context.clearRect(0, 0, canvas.width, canvas.height);
        dots.forEach(function() {
            var dot = this;
            if (derection) {
                if (Math.abs(dot.dx - dot.x) < 0.1 && Math.abs(dot.dy - dot.y) < 0.1 && Math.abs(dot.dz - dot.z) < 0.1) {
                    // 已经变成图片
                    dot.x = dot.dx;
                    dot.y = dot.dy;
                    dot.z = dot.dz;
                    // 超过300ms变成图片, 变成false
                    if (thisTime - lastTime > 300) {
                        get3img();
                        derection = false;
                    }
                } else {
                    // 正在变成图片
                    dot.x = dot.x + (dot.dx - dot.x) * 0.1;
                    dot.y = dot.y + (dot.dy - dot.y) * 0.1;
                    dot.z = dot.z + (dot.dz - dot.z) * 0.1;
                    lastTime = +new Date()
                }
            } else {
                // get3img();
                // // x已接近初始位置
                if (Math.abs(dot.tx - dot.x) < 0.1 && Math.abs(dot.ty - dot.y) < 0.1 && Math.abs(dot.tz - dot.z) < 0.1) {
                    dot.x = dot.tx;
                    dot.y = dot.ty;
                    dot.z = dot.tz;
                } else {
                    // x正在接近初始位置
                    dot.x = dot.x + (dot.tx - dot.x) * 0.1;
                    dot.y = dot.y + (dot.ty - dot.y) * 0.1;
                    dot.z = dot.z + (dot.tz - dot.z) * 0.1;
                }
            }
            dot.paint();
        });

            if ("requestAnimationFrame" in window) {
                requestAnimationFrame(animate);
            }
            else if ("webkitRequestAnimationFrame" in window) {
                webkitRequestAnimationFrame(animate);
            }
            else if ("msRequestAnimationFrame" in window) {
                msRequestAnimationFrame(animate);
            }
            else if ("mozRequestAnimationFrame" in window) {
                mozRequestAnimationFrame(animate);
            }

    }

   function get3img() {
       var imgObj3 = new Image();
       imgObj3.src = "./image/3/bottle.png";
       drawImg(imgObj3, 3);
   }
}

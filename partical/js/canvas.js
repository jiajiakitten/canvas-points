function drawPics(imgObj, index) {
    var canvas = document.getElementById("canvas");
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    var context = canvas.getContext('2d');
    focallength = 350;
    var derection = true;
    var dots = [];
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
        this.radius = radius;
    }
    Dot.prototype = {
        paint: function () {
            context.save();
            context.beginPath();
            var scale = focallength / (focallength + this.z);
            context.arc(canvas.width / 2 + (this.x - canvas.width / 2) * scale, canvas.height / 2 + (this.y - canvas.height / 2) * scale, this.radius * scale, 0, 2 * Math.PI);
            context.fillStyle = "rgba(250,250,250," + scale + ")";
            context.fill();
            context.restore();
        }
    }
    Array.prototype.forEach = function(callback) {
        for (var i = 0; i < this.length; i++) {
            callback.call(this[i]);
        }
    }
    drawImg(imgObj, index);
    function drawImg(imgObj, index) {
        console.log(imgObj, index, 'imgObj');
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
                    break;
                case 3:
                    distance = 1;
                    context.drawImage(imgObj, canvas.width - imgObj.width / 1.3, canvas.height - imgObj.height / 1.3, imgObj.width / 1.3, imgObj.height / 1.3);
                    break;
                default:
                    break;
            }
            dots = getimgData(imgObj, distance);
            console.log(dots);
            initAnimate();
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
                if (imgData.data[i] >= 103) {
                    var dot = new Dot(x - 3, y - 3, 0, 1);
                    dots.push(dot);
                }
            }
        }
        return dots;
    }

    function initAnimate() {
        dots.forEach(function() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.z = Math.random() * focallength * 2 - focallength;
            this.tx = Math.random() * canvas.width;
            this.ty = Math.random() * canvas.height;
            this.tz = Math.random() * focallength * 2 - focallength;
            this.paint();
        });
        animate();
    }
    function animate() {
        animateRunning = true;
        var thisTime = +new Date();
        context.clearRect(0, 0, canvas.width, canvas.height);
        dots.forEach(function() {
            var dot = this;
            if (derection) {
                if (Math.abs(dot.dx - dot.x) < 0.1 && Math.abs(dot.dy - dot.y) < 0.1 && Math.abs(dot.dz - dot.z) < 0.1) {
                    dot.x = dot.dx;
                    dot.y = dot.dy;
                    dot.z = dot.dz;
                    if (thisTime - lastTime > 300) derection = false;
                } else {
                    dot.x = dot.x + (dot.dx - dot.x) * 0.1;
                    dot.y = dot.y + (dot.dy - dot.y) * 0.1;
                    dot.z = dot.z + (dot.dz - dot.z) * 0.1;
                    lastTime = +new Date()
                }
            }
            else {
                if (Math.abs(dot.tx - dot.x) < 0.1 && Math.abs(dot.ty - dot.y) < 0.1 && Math.abs(dot.tz - dot.z) < 0.1) {
                    dot.x = dot.tx;
                    dot.y = dot.ty;
                    dot.z = dot.tz;
                } else {
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


}

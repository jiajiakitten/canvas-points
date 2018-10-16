//
//
// function initThree() {
//
//     var renderer;
//     var scene;
//     var camera;
//
//     width = document.documentElement.clientWidth;
//     height = document.documentElement.clientHeight;
//     renderer = new THREE.WebGLRenderer();
//     renderer.setSize(width, height);
//     document.getElementById('three-canvas').appendChild( renderer.domElement );
//     renderer.setClearColor(0x666666, 1.0);
//
//     camera = new THREE.PerspectiveCamera( 45, window /height, 1, 500 );
//     camera.position.set( 0, 0, 100 );
//     camera.lookAt( 0, 0, 0 );
//
//     scene = new THREE.Scene();
// }
// function geometry() {
//     var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
//
//     var geometry = new THREE.Geometry();
//     geometry.vertices.push( new THREE.Vector3( -50, -50, 0 ) );
//     geometry.vertices.push( new THREE.Vector3(  50, -50, 0 ) );
//     geometry.vertices.push( new THREE.Vector3(  50,  50, 0 ) );
//     //create a new face using vertices 0, 1, 2
//     var normal = new THREE.Vector3( 0, 1, 0 ); //optional
//     var color = new THREE.Color( 0xffaa00 ); //optional
//     var materialIndex = 0; //optional
//     var face = new THREE.Face3( 0, 1, 2, normal, color, materialIndex );
//     geometry.faces.push( face );
//    geometry.computeFaceNormals();
//    geometry.computeVertexNormals();
//     console.log(geometry.vertices);
//     scene.add( new THREE.Mesh( geometry, material ) );
// }
// function render()
// {
//     renderer.render(scene, camera);
//     // requestAnimationFrame(render);
// }
function threeStart(DotsList) {
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('three-canvas').appendChild( renderer.domElement );

    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set( 0, 0, 1000 );
    camera.lookAt( 0, 0, 0 );

    var scene = new THREE.Scene();
    var starsGeometry = new THREE.Geometry();


console.log(DotsList[3], window.innerHeight,window.innerWidth);
var width = window.innerWidth;
let height = window.innerHeight;
    for ( var i = 0; i < DotsList[2].length; i++ ) {

        var star = new THREE.Vector3();

        // star.x = DotsList[3][i].x;
        star.y = DotsList[3][i].y - height ;
        star.x = DotsList[3][i].x - width / 2;
        star.z =DotsList[3][i].z;

        starsGeometry.vertices.push( star );

    }

    var starsMaterial = new THREE.PointsMaterial( { color: 0x888888 } );

    var starField = new THREE.Points( starsGeometry, starsMaterial );

    scene.add( starField );
    renderer.render( scene, camera );



    //
    // console.log(DotsList[3][1]);
    // for (let a = 0; a < DotsList[3].length; a++){
    //     geometry.vertices.push( new THREE.Vector3( DotsList[3][a].x, DotsList[3][a].y, DotsList[3][a].z) );
    //
    //
    // }
    // console.log(geometry.vertices);
    //
    // scene.add( new THREE.Points( geometry, material ) );
    //
    // renderer.render( scene, camera );
}

// 定义初始点和目标点 都是散开的点
// focallength = 100;
// function initAnimate(dots) {
//     dots.forEach(function() {
//         this.x = Math.random() * 3;
//         this.y = Math.random() * canvas.height;
//         this.z = Math.random() * focallength * 2 - focallength;
//         this.tx = Math.random() * 3;
//         this.ty = Math.random() * canvas.height;
//         this.tz = Math.random() * focallength * 2 - focallength;
//         this.paint();
//     });
//     animateToImg(dots);
// }
// 设置点从图变成下一张图
// function changePics(dots, index) {
//     switch (index) {
//         case 1: initAnimate(dots)
//             break;
//         case 2:
//             // 图二的dots
//             // let be = dotsList.length;
//             // let en = dots.length;
//             // let b = 0;
//             // var dotsList2 = dotsList.concat(dots.slice(be));
//             // console.log(dotsList2, be, en);
//             // dotsList2.forEach(function(i) {
//             //     b = i;
//             //     if (!dots[b]) {b = 0}
//             //     this.dx = dots[b].dx;
//             //     this.dy = dots[b].dy;
//             //     this.dz = dots[b].dz;
//             //     // this.paint();
//             // });
//             // animateToImg(dotsList2);
//
//             let be = dotsList.length;
//             let lastDots = dots.slice(be);
//             var lastDotsL = lastDots.length;
//             dotsList.forEach(function(i) {
//                 this.dx = dots[i].dx;
//                 this.dy = dots[i].dy;
//                 this.dz = dots[i].dz;
//                 this.paint();
//             });
//             lastDots.forEach(function(i) {
//                 this.x = dotsList[700].x;
//                 this.y = dotsList[700].y;
//                 this.z = dotsList[700].z;
//                 this.paint();
//             });
//             dotsList2 = dotsList.concat(lastDots);
//             console.log(dotsList2);
//             animateToImg(dotsList2);
//             break;
//         case 3:
//             // 图三的dots
//             var a = 0;
//             dotsList2.forEach(function(i) {
//                 // if (a >= dots.length) a = i % dots.length;
//                 var dots2L = dotsList2.length;
//                 var dots3L = dots.length;
//                 let b = parseInt(dots2L / dots3L);
//                 // this.dx = dots[a].dx;
//                 // this.dy = dots[a].dy;
//                 // this.dz = dots[a].dz;
//                 if (i % b === 1 && dots[a]) {
//                     this.dx = dots[a].dx;
//                     this.dy = dots[a].dy;
//                     this.dz = dots[a].dz;
//                     a++;
//                 } else {
//                      this.radius = 0;
//                 }
//                 this.paint();
//             });
//             animateToImg(dotsList2);
//             break;
//     }
//
// }
// // 定义动画
// function animateToImg(dots) {
//     var thisTime = +new Date();
//     // var lastTime;
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     dots.forEach(function() {
//         var dot = this;
//         if (Math.abs(dot.dx - dot.x) < 0.1 && Math.abs(dot.dy - dot.y) < 0.1 && Math.abs(dot.dz - dot.z) < 0.1) {
//             // 已经变成图片
//             dot.x = dot.dx;
//             dot.y = dot.dy;
//             dot.z = dot.dz;
//         } else {
//             // 正在变成图片
//             dot.x = dot.x + (dot.dx - dot.x) * 0.1;
//             dot.y = dot.y + (dot.dy - dot.y) * 0.1;
//             dot.z = dot.z + (dot.dz - dot.z) * 0.1;
//             lastTime = +new Date()
//         }
//         dot.paint();
//     });
//
//     // 超过300ms变成图片, 变成false
//     if (thisTime - lastTime <= 300) {
//         if ("requestAnimationFrame" in window) {
//             requestAnimationFrame(function(){
//                 animateToImg(dots)
//             });
//         }
//         else if ("webkitRequestAnimationFrame" in window) {
//             webkitRequestAnimationFrame(function(){
//                 animateToImg(dots)
//             });
//         }
//         else if ("msRequestAnimationFrame" in window) {
//             msRequestAnimationFrame(function(){
//                 animateToImg(dots)
//             });
//         }
//         else if ("mozRequestAnimationFrame" in window) {
//             mozRequestAnimationFrame(function(){
//                 animateToImg(dots)
//             });
//         }
//     }
// }
//
//
// function drawPics(imgObjList, index) {
//     drawImg(imgObjList, index);
//
// }
//
// function changePictures(imgObj, index) {
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     drawImg(imgObj, index);
// }
//
// function getDots(){
//
// }
/**
 * Created by jess on 18/10/11.
 */

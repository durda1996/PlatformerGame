/**
 * Created by Oldanko on 09.02.2017.
 */

(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

document.getElementById('canvas').style.backgroundImage = "url('images/walk/background2.jpg')";
backAudio.loop = true;
backAudio.play();
backAudio.volume = 0.1;

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 1135,
    height = 568,
    player = {
        x : width/2,
        y : height - 50,
        width : 40,
        height : 50,
        speed: 3,
        velX: 0,
        velY: 0,
        jumping: false,
        mirror: true,
        spriteSinceLastUpdate: 0,
        spriteFrame: 0,
        spriteUpdates: false
    },

    keys = [],
    friction = 0.85,
    gravity = 0.4;

canvas.width = width;
canvas.height = height;

var d = new Date();
var lastTime = d.getTime();
var thisTime = d.getTime();
var delta = 0;

var offset = 0;
var counter = 0;
var fishScore = 0;

var boxes = [];
var fish = [];
var blocks = [];

//adding boxes--------------------------------------------------------------
boxes.push({
    x: width/2 + 50,
    y: height - 200,
    width: 198,
    height: 38
});

boxes.push({
    x: width/2 + 250,
    y: height - 300,
    width: 198,
    height: 38
});
boxes.push({
    x: width/2 - 100,
    y: height - 400,
    width: 198,
    height: 38
});
boxes.push({
    x: width/2 - 250,
    y: height - 480,
    width: 198,
    height: 38
});

//adding blocks----------------------------------------------------------
blocks.push({
    x:700,
    y:0,
    width: 40,
    height: 40,
    velX: 0,
    velY: 0
});

//adding fishes----------------------------------------------------------

function addFish(x, y) {
    fish.push({
        x: x,
        y: y,
        width: 40,
        height: 25,
        active: true
    });
}

addFish(width/2 + 100, height - 240);
addFish(200, 200);

//-----------------------------------------------------------------------


function update(){
    // check keys
    lastTime = thisTime;

    counter++;

    updateControls();
    updateGameWorld();
    updateSprites();
    render();

    requestAnimationFrame(update);
    d = new Date();
    thisTime = d.getTime();
    delta = thisTime - lastTime;
}
//setup event listeners
document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});
//instead window.onload
window.addEventListener("load",function(){
    d = new Date();
    thisTime = lastTime = d.getTime();
    update();
});

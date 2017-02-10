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
        y : 0,
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
    gravity = 0.5;

canvas.width = width;
canvas.height = height;

var initialPos =
{
    x : width / 2,
    y : 0
}

var d = new Date();
var lastTime = d.getTime();
var thisTime = d.getTime();
var delta = 0;

var offset = 0;
var counter = 0;
var fishScore = 0;

var box = {
        width: 198,
        height: 38
    };
var Fish = {
    width: 40,
    height: 25
}
var block = {
    width: 40,
    height: 40
}

var boxes = [];
var fish = [];
var blocks = [];

//var level = level1;



//adding boxes--------------------------------------------------------------
function addBox(x, y, boxArr)
{
    boxArr.push({
        x: x,
        y: y
    });
}

addBox(width/2 + 50, height - 200, boxes);
addBox(width/2 + 250,height - 300, boxes);
addBox(width/2 - 100,height - 400, boxes);
addBox(width/2 - 250,height - 480, boxes);

//adding blocks----------------------------------------------------------
function addBlock(x, y, blockArr) {
        blockArr.push({
        x:x,
        y:y,
        velX: 0,
        velY: 0
    });
}


addBlock(700, 0, blocks);



//adding fishes----------------------------------------------------------

function addFish(x, y, fishArr) {
    fishArr.push({
        x: x,
        y: y,
        active: true
    });
}

addFish(width/2 + 100, height - 240, fish);
addFish(200, 200, fish);



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

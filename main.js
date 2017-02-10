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


var level = [level1, level2];
current = 0;

initLevel();

function initLevel()
{
    restart();

    boxes = [];
    for(var i = 0; i < level[current].boxes.length; i++)
    {
        addBox(level[current].boxes[i].x, level[current].boxes[i].y);
    }

    fish = [];
    for(var i = 0; i < level[current].fish.length; i++)
    {
        addFish(level[current].fish[i].x, level[current].fish[i].y);
    }
}


function restart()
{
    player.velY = 0;
    player.velX = 0;
    player.x = level[current].x - offset;
    player.y = 0;
    blocks = [];
    for(var i = 0; i < level[current].blocks.length; i++)
    {
        addBlock(level[current].blocks[i].x, level[current].blocks[i].y);
    }
}

//adding boxes--------------------------------------------------------------
function addBox(x, y)
{
    boxes.push({
        x: x,
        y: y
    });
}


//adding blocks----------------------------------------------------------
function addBlock(x, y) {
        blocks.push({
        x:x,
        y:y,
        velX: 0,
        velY: 0
    });
}

//adding fishes----------------------------------------------------------

function addFish(x, y) {
    fish.push({
        x: x,
        y: y,
        active: true
    });
}



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

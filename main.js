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
        mirror: true
    },


    keys = [],
    friction = 0.85,
    gravity = 0.4;

var offset = 0;

var counter = 0;

var boxes = [];

var fish = [];
var fishScore = 0;
var blocks = [];

//adding boxes--------------------------------------------------------------

var d = new Date();

var lastTime = d.getTime();
var thisTime = d.getTime();
var delta = 0;

//adding boxes--------------------------------------------------------------

// dimensions
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

//-----------------------------------------------------------------------

//adding blocks----------------------------------------------------------

blocks.push({
    x:700,
    y:0,
    width: 40,
    height: 40,
    velX: 0,
    velY: 0
});

//-----------------------------------------------------------------------

//adding fishes----------------------------------------------------------
addFish(width/2 + 100, height - 240);
addFish(200, 200);
//-----------------------------------------------------------------------

function addFish(x, y) {
    fish.push({
        x: x,
        y: y,
        width: 40,
        height: 25,
        active: true
    });
}

var move = new Array();
var moveMirror = new Array();
var numOfSpritesMove = 4;
for(var i = 0; i < numOfSpritesMove; i++){
    move[i] = new Image();
    move[i].src = 'images/walk/'.concat(i + 1).concat('.png');
    moveMirror[i] = new Image();
    moveMirror[i].src = 'images/walk/'.concat(i + 1).concat('mirror.png');
}


canvas.width = width;
canvas.height = height;

function render()
{
    ctx.clearRect(0,0,width,height);
    ctx.save();
    drawBoxes();
    drawFish();
    drawBlocks();

    //drawMirroredCharacter();
    if(player.mirror){
        //drawCharacter();
        walkRight();
    } else {
        //drawMirroredCharacter();
        walkLeft();
    }

    ctx.font="20px Verdana";
    ctx.fillText("Score: " + fishScore, 20, 20);
}

function drawBoxes(){
    for (var i = 0; i < boxes.length; i++) {
        ctx.drawImage(block,  0, 0, 198, 38,  boxes[i].x - offset, boxes[i].y, boxes[i].width, boxes[i].height);
    }
}

function drawFish()
{
    for (var i = 0; i < fish.length; i++) {
        if(fish[i].active)
            ctx.drawImage(fishImage,  0, 0, 40, 29, fish[i].x - offset, fish[i].y, fish[i].width, fish[i].height);
    }
}

function drawBlocks()
{
    for (var i = 0; i < blocks.length; i++)
    {
        ctx.drawImage(block, 0, 0, 38, 38, blocks[i].x - offset, blocks[i].y, blocks[i].width, blocks[i].height);
    }
}

function updateSprites()
{
    if(player.spriteUpdates && !player.jumping) {
        player.spriteSinceLastUpdate += delta;
        if (player.spriteSinceLastUpdate > 125) {
            player.spriteSinceLastUpdate -= 125;
            player.spriteFrame++;
        }
    }
    else {
        player.spriteSinceLastUpdate = 99;
        player.spriteFrame = 0;
    }
}


function walkRight(){
    ctx.drawImage(walkRightImg, 101*(player.spriteFrame%4), 0, 101, 115, player.x, player.y, player.width, player.height);
}

function walkLeft(){
    ctx.drawImage(walkLeftImg, 101*(player.spriteFrame%4), 0, 101, 115, player.x, player.y, player.width, player.height);
}

function collisionPlayer(p)
{
    for (var i = 0; i < boxes.length; i++) {
        var vecX = (p.x + (p.width / 2)) - (boxes[i].x - offset + (boxes[i].width / 2));
        var vecY = (p.y + (p.height / 2)) - (boxes[i].y + (boxes[i].height / 2));

        var hHeight = (p.height + boxes[i].height)/2;
        var hWidth= (p.width + boxes[i].width)/2;

        if (Math.abs(vecX) < hWidth && Math.abs(vecY) < hHeight) {         // figures out on which side we are colliding (top, bottom, left, or right)         var oX = hWidths - Math.abs(vX),             oY = hHeights - Math.abs(vY);         if (oX >= oY) {
            var oX = hWidth - Math.abs(vecX),
                oY = hHeight - Math.abs(vecY);
            if (oX >= oY) {
                if (vecY > 0) { // top

                    p.y += oY;
                    p.velY = 0;
                } else { // bottom

                    p.jumping = false;
                    p.y -= oY-1;
                    p.velY = 0;
                }
            } else {

                if (vecX > 0) {// left

                    p.x += oX;
                    p.velX = 0;
                } else { // right

                    p.x -= oX;
                    p.velX = 0;
                }
            }
        }
    }
}

function collisionBlock(b)
{
    for (var j = 0; j < boxes.length; j++) {

        var vecX = (b.x + (b.width / 2)) - (boxes[j].x + (boxes[j].width / 2));
        var vecY = (b.y + (b.height / 2)) - (boxes[j].y + (boxes[j].height / 2));

        var hHeight = (b.height + boxes[j].height) / 2;
        var hWidth = (b.width + boxes[j].width) / 2;

        if (Math.abs(vecX) < hWidth && Math.abs(vecY) < hHeight) {         // figures out on which side we are colliding (top, bottom, left, or right)         var oX = hWidths - Math.abs(vX),             oY = hHeights - Math.abs(vY);         if (oX >= oY) {
            var oX = hWidth - Math.abs(vecX),
                oY = hHeight - Math.abs(vecY);
            if (oX >= oY) {
                if (vecY < 0) {
                    b.y -= oY - 1;
                    b.velY = 0;
                }
            } else {

                if (vecX > 0) {// left

                    b.x += oX;
                    b.velX = 0;
                } else { // right

                    b.x -= oX;
                    b.velX = 0;
                }
            }
        }
    }
}

function updateGameWorld() {
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].velX *= friction;
        blocks[i].velY += gravity;

        blocks[i].x += blocks[i].velX;
        blocks[i].y += blocks[i].velY;

        if (blocks[i].y >= height - blocks[i].height - 130)
            blocks[i].y = height - blocks[i].height - 130;

        //react to player


        //react to environment
        collisionBlock(blocks[i]);
    }

    player.velX *= friction;

    if(player.jumping)
        player.velY += gravity;

    player.x += player.velX;
    player.y += player.velY;


    if (player.x >= width - player.width) {
        player.x = width - player.width;
    } else if (player.x <= 0) {
        player.x = 0;
    }

    player.jumping = true;

    collisionPlayer((player));

    for(var i = 0; i < fish.length; i++) {
        if (fish[i].active) {
            var fishVecX = (player.x + (player.width / 2)) - (fish[i].x - offset + (fish[i].width / 2));
            var fishVecY = (player.y + (player.height / 2)) - (fish[i].y + (fish[i].height / 2));

            for(var i = 0; i <
            fish.length; i++){
                var fishVecX = (player.x + (player.width / 2)) - (fish[i].x

                    - offset + (fish[i].width / 2));
                var
                    fishVecY = (player.y + (player.height / 2)) - (fish[i].y + (

                        fish[i].height / 2));

                var fishHHeight = (player.height +
                    fish[i].height) / 2;
                var fishHWidth = (player.width +
                        fish[i].width) / 2
                    ;

                if (Math.abs(fishVecX) < fishHWidth && Math.abs(fishVecY) < fishHHeight) {
                    fish[i].active = false;
                    eatAudio.play();
                    fishScore++;
                }
            }
        }

        if(player.y >= height -
            player.height - 130){
            player.y = height - player.height - 130;
            player.jumping =
                false
            ;
        }

        if(player.x >= width*2/3)
        {
            offset += player.x - width*2/3;
            player.x = width*2/3;
        } else if(player.x < width*1/3)
        {
            offset += player.x - width*1/3;
            player.x = width*1/3;
        }
    }
}

function updateControls()
{
    player.spriteUpdates = false;

    if (keys[39]) {
        // right arrow
        if (player.velX < player.speed) {
            player.velX++;
            player.mirror = true;
//                walkRight();
//                counter++;
        }
        player.spriteUpdates = true;

    }
    if (keys[37]) {
        // left arrow
        if (player.velX > -player.speed) {
            player.velX--;
            player.mirror = false;
        }
        player.spriteUpdates = true;
    }

    if (keys[38] || keys[32]) {
        // up arrow or space
        if(!player.jumping){
            player.jumping = true;
            player.velY = -player.speed*4;
            jumpAudio.play();
        }
    }
}

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

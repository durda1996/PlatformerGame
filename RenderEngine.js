/**
 * Created by Oldanko on 09.02.2017.
 */
function render()
{
    ctx.clearRect(0,0,width,height);
    ctx.save();
    drawBoxes();
    drawFish();
    drawBlocks();

    if(player.mirror){
        walkRight();
    } else {
        walkLeft();
    }

    ctx.font="20px Verdana";
    ctx.fillText("Score: " + fishScore, 20, 20);
    //ctx.fillText("Velocity: " + player.velX, 20, 40);
}

function drawBoxes(){
    for (var i = 0; i < boxes.length; i++) {
        ctx.drawImage(block,  0, 0, 198, 38,  boxes[i].x - offset, boxes[i].y, boxes[i].width, boxes[i].height);
    }
}

function drawFish(){
    for (var i = 0; i < fish.length; i++) {
        if(fish[i].active)
            ctx.drawImage(fishImage,  0, 0, 40, 29, fish[i].x - offset, fish[i].y, fish[i].width, fish[i].height);
    }
}

function drawBlocks(){
    for (var i = 0; i < blocks.length; i++)
    {
        ctx.drawImage(block, 0, 0, 38, 38, blocks[i].x - offset, blocks[i].y, blocks[i].width, blocks[i].height);
    }
}

function walkRight(){
    ctx.drawImage(walkRightImg, 101*(player.spriteFrame%4), 0, 101, 115, player.x, player.y, player.width, player.height);
}

function walkLeft(){
    ctx.drawImage(walkLeftImg, 101*(player.spriteFrame%4), 0, 101, 115, player.x, player.y, player.width, player.height);
}

function updateSprites(){
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
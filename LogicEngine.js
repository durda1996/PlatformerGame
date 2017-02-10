/**
 * Created by Oldanko on 09.02.2017.
 */
function collisionPlayer(p)
{
    for (var i = 0; i < boxes.length; i++) {
        var vecX = (p.x + (p.width / 2)) - (boxes[i].x - offset + (box.width / 2));
        var vecY = (p.y + (p.height / 2)) - (boxes[i].y + (box.height / 2));

        var hHeight = (p.height + box.height) / 2;
        var hWidth = (p.width + box.width) / 2;

        if (Math.abs(vecX) < hWidth && Math.abs(vecY) < hHeight) {         // figures out on which side we are colliding (top, bottom, left, or right)         var oX = hWidths - Math.abs(vX),             oY = hHeights - Math.abs(vY);         if (oX >= oY) {
            var oX = hWidth - Math.abs(vecX),
                oY = hHeight - Math.abs(vecY);
            if (oX >= oY) {
                if (vecY > 0) { // top

                    p.y += oY;
                    p.velY = 0;
                } else { // bottom

                    p.jumping = false;
                    p.y -= oY - 1;
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

    for (var i = 0; i < blocks.length; i++) {
        var vecX = (p.x + (p.width / 2)) - (blocks[i].x - offset + (block.width / 2));
        var vecY = (p.y + (p.height / 2)) - (blocks[i].y + (block.height / 2));

        var hHeight = (p.height + block.height) / 2;
        var hWidth = (p.width + block.width) / 2;

        if (Math.abs(vecX) < hWidth && Math.abs(vecY) < hHeight) {         // figures out on which side we are colliding (top, bottom, left, or right)         var oX = hWidths - Math.abs(vX),             oY = hHeights - Math.abs(vY);         if (oX >= oY) {
            var oX = hWidth - Math.abs(vecX),
                oY = hHeight - Math.abs(vecY);
            if (oX >= oY) {
                if (vecY > 0) { // top

                    p.y += oY;
                    p.velY = 0;
                } else { // bottom

                    p.jumping = false;
                    p.y -= oY - 1;
                    p.velY = 0;
                }
            } else {

                if (vecX > 0) {// left

                    p.x += oX;
                } else { // right

                    p.x -= oX;
                }
            }
        }
    }

}

function collisionBlock(b)
{

    var vecX = (b.x - offset + (block.width / 2)) - (player.x + (player.width / 2));
    var vecY = (b.y + (block.height / 2)) - (player.y + (player.height / 2));

    var hHeight = (block.height + player.height) / 2;
    var hWidth = (block.width + player.width) / 2;

    if (Math.abs(vecX) < hWidth && Math.abs(vecY) < hHeight) {
        var oX = hWidth - Math.abs(vecX),
            oY = hHeight - Math.abs(vecY);
        if (oX < oY)
        {
            if (vecX > 0) {// left
                b.velX = 1.0;
            } else { // right
                b.velX = -1.0;
            }
        }
    }

    for (var j = 0; j < boxes.length; j++) {

        var vecX = (b.x + (block.width / 2)) - (boxes[j].x + (box.width / 2));
        var vecY = (b.y + (block.height / 2)) - (boxes[j].y + (box.height / 2));

        var hHeight = (block.height + box.height) / 2;
        var hWidth = (block.width + box.width) / 2;

        if (Math.abs(vecX) < hWidth && Math.abs(vecY) < hHeight) {
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

function updateGameWorld()
{
    player.velX *= friction*delta/17;

    if(player.jumping)
        player.velY += gravity*delta/17;

    player.x += player.velX*delta/17;
    player.y += player.velY*delta/17;



    for (var i = 0; i < blocks.length; i++) {
        blocks[i].velX *= friction*delta/17;
        blocks[i].velY += gravity*delta/17;

        blocks[i].x += blocks[i].velX*delta/17;
        blocks[i].y += blocks[i].velY*delta/17;

        //react to environment
        collisionBlock(blocks[i]);
    }



    if (player.x >= width - player.width) {
        player.x = width - player.width;
    } else if (player.x <= 0) {
        player.x = 0;
    }

    player.jumping = true;

    collisionPlayer((player));

    for(var i = 0; i < fish.length; i++) {
        if (fish[i].active) {
            var fishVecX = (player.x + (player.width / 2)) - (fish[i].x - offset + (Fish.width / 2));
            var fishVecY = (player.y + (player.height / 2)) - (fish[i].y + (Fish.height / 2));


            var fishVecX = (player.x + (player.width / 2)) - (fish[i].x - offset + (Fish.width / 2));
            var fishVecY = (player.y + (player.height / 2)) - (fish[i].y + (Fish.height / 2));

            var fishHHeight = (player.height + Fish.height) / 2;
            var fishHWidth = (player.width + Fish.width) / 2
                ;

            if (Math.abs(fishVecX) < fishHWidth && Math.abs(fishVecY) < fishHHeight) {
                fish[i].active = false;
                eatAudio.play();
                fishScore++;
                current++;
                initLevel();
            }
        }

        if(player.y > canvas.height){
            restart();
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
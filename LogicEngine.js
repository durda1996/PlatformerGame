/**
 * Created by Oldanko on 09.02.2017.
 */
function collisionPlayer(p)
{
    for (var i = 0; i < boxes.length; i++) {
        var vecX = (p.x + (p.width / 2)) - (boxes[i].x - offset + (boxes[i].width / 2));
        var vecY = (p.y + (p.height / 2)) - (boxes[i].y + (boxes[i].height / 2));

        var hHeight = (p.height + boxes[i].height) / 2;
        var hWidth = (p.width + boxes[i].width) / 2;

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
        var vecX = (p.x + (p.width / 2)) - (blocks[i].x - offset + (blocks[i].width / 2));
        var vecY = (p.y + (p.height / 2)) - (blocks[i].y + (blocks[i].height / 2));

        var hHeight = (p.height + blocks[i].height) / 2;
        var hWidth = (p.width + blocks[i].width) / 2;

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

    var vecX = (b.x - offset + (b.width / 2)) - (player.x + (player.width / 2));
    var vecY = (b.y + (b.height / 2)) - (player.y + (player.height / 2));

    var hHeight = (b.height + player.height) / 2;
    var hWidth = (b.width + player.width) / 2;

    if (Math.abs(vecX) < hWidth && Math.abs(vecY) < hHeight) {         // figures out on which side we are colliding (top, bottom, left, or right)         var oX = hWidths - Math.abs(vX),             oY = hHeights - Math.abs(vY);         if (oX >= oY) {
        var oX = hWidth - Math.abs(vecX),
            oY = hHeight - Math.abs(vecY);
        if (oX < oY)
        {
            if (vecX > 0) {// left
                b.x += oX;
                b.velX += 0.5;
            } else { // right
                b.x -= oX;
                b.velX -= 0.5;
            }
        }
    }

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

function updateGameWorld()
{
    player.velX *= friction;

    if(player.jumping)
        player.velY += gravity;

    player.x += player.velX;
    player.y += player.velY;



    for (var i = 0; i < blocks.length; i++) {
        blocks[i].velX *= friction;
        blocks[i].velY += gravity;

        blocks[i].x += blocks[i].velX;
        blocks[i].y += blocks[i].velY;

        if (blocks[i].y >= height - blocks[i].height - 130)
            blocks[i].y = height - blocks[i].height - 130;

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
            var fishVecX = (player.x + (player.width / 2)) - (fish[i].x - offset + (fish[i].width / 2));
            var fishVecY = (player.y + (player.height / 2)) - (fish[i].y + (fish[i].height / 2));


            var fishVecX = (player.x + (player.width / 2)) - (fish[i].x - offset + (fish[i].width / 2));
            var fishVecY = (player.y + (player.height / 2)) - (fish[i].y + (fish[i].height / 2));

            var fishHHeight = (player.height + fish[i].height) / 2;
            var fishHWidth = (player.width + fish[i].width) / 2
                ;

            if (Math.abs(fishVecX) < fishHWidth && Math.abs(fishVecY) < fishHHeight) {
                fish[i].active = false;
                eatAudio.play();
                fishScore++;
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
/**
 * Created by Oldanko on 10.02.2017.
 */
level1 = {
    startX: width/2,
    startY: 0,
    boxes: [],
    blocks: [],
    fish: []
};


addBox(width/2 + 50, height - 200, level1.boxes);
addBox(width/2 + 250,height - 300, level1.boxes);
addBox(width/2 - 100,height - 400, level1.boxes);
addBox(width/2 - 250,height - 480, level1.boxes);


addBlock(700, 0, level1.blocks);

addFish(width/2 + 100, height - 240, level1.fish);
addFish(200, 200, level1.fish);

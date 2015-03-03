/**
 * Created by Vadim on 26.02.15.
 */

var model = {
    blocks : createBlocks(),
    ball : createBall(),
    platform : createPlatform()
};

function createBall()
{
    return {
        x  : 150,
        y  : 500,
        vx : 2.5,
        vy : -2.0,
        r  : 12
    };
}

function createPlatform(){
    return {
        x : 30,
        y : 630,
        width : 200,
        height: 10,
        v: 15
    }
}

function createBlockPosition(blockLeft, blockTop) {
    return {
        left: blockLeft,
        top: blockTop
    }
}
function createBlocks()
{
    var res = {
        blockWidth : 200,
        blockHeight: 25,
        positions  : new Array(12),
        isBlockHere : new Array(12)
    };

    for(var row = 0; row < 3; row++)
    {
        for(var col = 0; col < 4; col++)
        {
            var blockLeft = col * 267;
            var blockTop = row * 50;
            res.positions[row * 4 + col] = createBlockPosition(blockLeft, blockTop);
            res.isBlockHere[row * 4 + col] = true;
        }
    }

    return res;
}


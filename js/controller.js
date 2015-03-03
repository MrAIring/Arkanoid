/**
 * Created by Vadim on 26.02.15.
 */

function startController()
{
    var int = setInterval( gameStep, 17);
}

function movePlatformRight()
{
    var platform = model.platform;
    if ( platform.x < 795 )
        platform.x += platform.v;
}

function movePlatformLeft()
{
    var platform = model.platform;
    if( platform.x > 0)
        platform.x -= platform.v;
}

var isKeyLeftDown = false,
    isKeyRightDown = false;

document.onkeydown = function(evt)
{
    switch (evt.keyCode)
    {
        case 37:
            isKeyLeftDown = true;
            break;
        case 39:
            isKeyRightDown = true;
            break;
    }
};

document.onkeyup = function(evt)
{
    switch (evt.keyCode)
    {
        case 37:
            isKeyLeftDown = false;
            break;
        case 39:
            isKeyRightDown = false;
            break;
    }
};

function updateBall()
{
    var ballMod = model.ball;
    ballMod.x += ballMod.vx;
    ballMod.y += ballMod.vy;

    if ( model.ball.x <= 0 + ballMod.r)                        { ballMod.vx = -ballMod.vx;  }
    if ( model.ball.x >= 1000 - (ballMod.r))   { ballMod.vx = -ballMod.vx;  }
    if ( model.ball.y <= 0 )                        { ballMod.vy = -ballMod.vy;  }

    processBlocksColl();
    processPlatformColl();
}

function processBlocksColl(){
    var ballMod = model.ball;
    var blockMass = model.blocks.positions;
    var blocksMod = model.blocks;

    for (var i = 0; i < 12; i++) {
        var block = blockMass[i];
        var blockRight = block.left + blocksMod.blockWidth;
        var blockBottom = block.top + blocksMod.blockHeight;
        var blockChecking = model.blocks.isBlockHere[i];
        var isLeftWallCollision = isWallCollision(block.left, block.top, block.left, blockBottom, ballMod);
        var  isRightWallCollision = isWallCollision(blockRight, block.top, blockRight, blockBottom, ballMod);

        if (blockChecking)
        {
            if (isLeftWallCollision || isRightWallCollision)
            {
                ballMod.vx = -ballMod.vx;
                blockChecking = false;
            }

            if(isWallCollision(block.left, block.top, blockRight, block.top,ballMod)||
                isWallCollision(block.left, blockBottom, blockRight,blockBottom, ballMod))
            {
                ballMod.vy = -ballMod.vy;
                blockChecking = false;
            }
        }
    }
}

function blockCracked()
{

}

function processPlatformColl(){

    var ballMod = model.ball;
    var platformMod = model.platform;
    var platformBottom = platformMod.y + platformMod.height;
    var platformRight = platformMod.x + platformMod.width;

    var isLeftWallCollision = isWallCollision(platformMod.left, platformMod.top, platformMod.left, platformBottom, ballMod);
    var  isRightWallCollision = isWallCollision(platformRight, platformMod.top, platformRight, platformBottom, ballMod);

    if( isLeftWallCollision || isRightWallCollision)
    {
        ballMod.vx = -ballMod.vx;
    }

    if (isPlatformBallCollision( ballMod, platformMod))
    {
        ballMod.vy = -ballMod.vy;
    }
}

function isPlatformBallCollision(ballMod, platformMod){
    var platformRightSide = platformMod.x + platformMod.width;
    return isWallCollision(platformMod.x, platformMod.y, platformRightSide, platformMod.y, ballMod)
}

function isWallCollision(x1,y1,x2,y2,ballMod){
    var isVertical = false;
    if (x1 == x2)
    {
        isVertical = true;
    }
    if (isVertical)
    {
        var top = Math.min(y1, y2);
        var bottom = Math.max(y1,y2);
        var x = x2;
        return  ballMod.y >= top &&
            ballMod.y <= bottom &&
            Math.abs(ballMod.x - x) <= ballMod.r
    }
    else {
        var left = Math.min(x1,x2);
        var right = Math.max(x1,x2);
        var y = y2;
        return  ballMod.x >= left &&
            ballMod.x <= right &&
            Math.abs(ballMod.y - y) <= ballMod.r
    }
}



function updatePlatform()
{
    if (isKeyLeftDown)
        movePlatformLeft();
    if (isKeyRightDown)
        movePlatformRight();
}

function updateModel()
{
    updateBall();
    updatePlatform();
}

function gameStep()
{
    updateModel();
    drawAll();
}
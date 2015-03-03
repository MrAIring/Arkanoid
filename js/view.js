/**
 * Created by Vadim on 26.02.15.
 */
var htmlElements = {};
function initBlocks() {
    var res = new Array(12);
    var insertTo = document.querySelector('#here');
    for (var i = 0; i < res.length; i++) {
        res[i] = document.createElement('div');
        res[i].classList.add('bricks');
        insertTo.appendChild(res[i]);
    }
    return res;
}

function initView()
{
    htmlElements.platform = document.querySelector('#desk');
    htmlElements.ball     = document.querySelector('#ball');
    htmlElements.blocks   = initBlocks()
}

function drawPlatform()
{
    var style = htmlElements.platform.style;
    var platform = model.platform;

    style.left   = platform.x + 'px';
    style.top    = platform.y + 'px';
    style.width  = platform.width + 'px';
    style.height = platform.height + 'px';
}

function drawBall()
{
    var style = htmlElements.ball.style;
    var ball = model.ball;

    style.left  = ball.x - ball.r + 'px';
    style.top   = ball.y - ball.r + 'px';
}

function drawBlock(blockNumber, left, top, width, height, display) {
    var style = htmlElements.blocks[blockNumber].style;
    style.left = left + 'px';
    style.top = top + 'px';
    style.width = width + 'px';
    style.height = height + 'px';
    style.display = display;
    if (!display)
        style.display = 'hidden';
}

function drawBlocks()
{
    var blocksPositions =  model.blocks.positions;
    for (var i = 0; i < blocksPositions.length; i++) {
        drawBlock(i, blocksPositions[i].left, blocksPositions[i].top, model.blocks.blockWidth, model.blocks.blockHeight, model.blocks.isBlockHere[i])
    }
}

function drawAll() {
    drawBall();
    drawPlatform();
    drawBlocks();
}
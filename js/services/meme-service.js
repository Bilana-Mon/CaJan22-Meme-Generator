'use strict'

var gCanvas;
var gCanvasSize = 200;
var gCtx;
var gCurrText;
var gCurrColor;
var gTextField;
var gColorField;
var gCurrFontSize = 50;
var gIncreaseFontSize;
var gDecreaseFontSize;
var gSwitchLines;

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 };


var gMeme = {
    selectedImgIdx: 5,
    selectedLineIdx: 0,
    lines: []
}




function setLineTxt() {
    gMeme.lines.push({
        txt: gCurrText,
        size: gCurrFontSize,
        align: 'left',
        color: gCurrColor
    });
    return gMeme;
}

function drawText() {
    gTextField.oninput = function () {
        renderText();
        setLineTxt();
    }
    gIncreaseFontSize.onclick = function () {
        // gCtx.font = "impact";
        renderText();

    }
    gDecreaseFontSize.onclick = function () {
        // gCtx.font = "impact";
        renderText();

    }
}


function changeColor() {
    gCtx.fillStyle = gCurrColor;
    gCtx.strokeStyle = 'black';
    gCtx.textAlign = 'middle';
}

function renderText() {
    gMeme.lines.forEach(line => {
        gCtx.font = `${gCurrFontSize}px impact`;
        gCtx.fillText(gCurrText, 65, 40);
    })

    console.log(gCtx.font);
}


function getLineLocation(location, length) {
    switch (location) {
        case 'top': {
            return { x: gCanvasSize / 2, y: 0 }
        }
        case 'middle': {
            return { X: 0, y: 0 }
        }
    }
}



function drawImageFromLocal() {
    var img = new Image();
    drawText();

}





function addLine() {
    gTextField.oninput = function () {
        gCtx.fillText(gCurrText, 65, 40);
        gCtx.strokeText(gCurrText, 65, 40);
        setLineTxt();
    }
    console.log(gMeme);

}



'use strict'

function init() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    gTextField = document.querySelector('.txt');
    gColorField = document.querySelector('.color');
    gIncreaseFontSize = document.querySelector('.increase-txt');
    gDecreaseFontSize = document.querySelector('.decrease-txt');
    gSwitchLines = document.querySelector('.switch-lines');
    renderMeme();
    renderGallery();
    onImgSelect();

}

function eventTextField() {
    gTextField.addEventListener('input', (ev) => {
        gCurrText = ev.target.value;
    });
}

function eventColorField() {
    gColorField.addEventListener('input', (ev) => {
        gCurrColor = ev.target.value;
        changeColor();
    });
}

function eventIncreaseFontSize() {
    gIncreaseFontSize.addEventListener('click', (ev) => {
        gCurrFontSize++;
        // setFontSize()
        // changeFontSize()
        console.log(gCurrFontSize);

    });
}

function eventDecreaseFontSize() {
    gDecreaseFontSize.addEventListener('click', (ev) => {
        gCurrFontSize--;
        // setFontSize()
        // changeFontSize()
        console.log(gCurrText);
        console.log(gCurrFontSize);

    });
}

function setFontSize() {
    gCurrText.style.fontSize = gCurrFontSize;
}


function onAddLine() {
    var elContianer = document.querySelector('.control-box')
    var strHTML = '<input class="txt " type="text" placeholder="Enter Text Here">';
    var elBtnAdd = document.querySelector('.add');

    elBtnAdd.addEventListener('click', (ev) => {
        elContianer.innerHTML += strHTML;
        addLine()
    });
}

function onSwitchLines() {
    gTextField = document.querySelector('.txt');
}



function renderMeme() {
    eventTextField();
    eventColorField();
    eventIncreaseFontSize();
    eventDecreaseFontSize();
    drawImageFromLocal();
    onAddLine()

}


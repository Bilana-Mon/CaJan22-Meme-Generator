'use strict'
var gCanvas = document.getElementById('my-canvas');
var gCtx = gCanvas.getContext('2d');
var gTextField = document.querySelector('.txt');
var gColorField = document.querySelector('.color');
var gIncreaseFontSize = document.querySelector('.increase-txt');
var gDecreaseFontSize = document.querySelector('.decrease-txt');
var gSwitchLines = document.querySelector('.switch-lines');
var gAddLine = document.querySelector('.add-line');
var gDeleteLine = document.querySelector('.delete-line');
var gFontFamily = document.querySelector('.fonts');
var gAlignLeft = document.querySelector('.align-btn-left');
var gAlignCenter = document.querySelector('.align-btn-center');
var gAlignRight = document.querySelector('.align-btn-right');
var gCurrentLine = {
    value: '',
    size: 20,
    color: 'white',
    position: 'top',
    fontFamily: 'impact',
    align: 'left',
    offsetX: 0,
    offsetY: 0,
    isDragged: false
};

var CANVAS_SIZE = 200;
var CANVAS_PADDING = 20;
var MEME_STORAGE_KEY = 'memes';

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 };

var gMeme = {
    selectedImgIdx: 5,
    selectedLineIdx: 0,
    imageId: undefined,
    lines: []
}

function _initMeme() {
    _renderMeme();
    _attachEventColorField();
    _attachEventTextField();
    _attachEventDecreaseFontSize();
    _attachEventIncreaseFontSize();
    _attachEventAddLine();
    _attachEventSwitchLinesFocus();
    _attachEventDeleteLine();
    _attachEventSetFontFamily();
    _attachEventAlignBtns();
    _attachEventDragAndDrop();
}

function _setSelectedMemeId(selectedMemeId) {
    gMeme.imageId = selectedMemeId;
    _initMeme();
}

function _resetTextField() {
    gTextField.value = '';
}

function _attachEventTextField() {
    gTextField.addEventListener('input', (ev) => {
        gCurrentLine.value = ev.target.value;
        _renderMeme();
    });
}

function _attachEventColorField() {
    gColorField.addEventListener('input', (ev) => {
        gCurrentLine.color = ev.target.value;
        _renderMeme();
    });
}

function _attachEventIncreaseFontSize() {
    gIncreaseFontSize.addEventListener('click', (ev) => {
        gCurrentLine.size = gCurrentLine.size + 1;
        _renderMeme()
    });
}



function _attachEventDecreaseFontSize() {
    gDecreaseFontSize.addEventListener('click', (ev) => {
        gCurrentLine.size = gCurrentLine.size - 1;
        _renderMeme()
    });
}

function _attachEventAddLine() {
    gAddLine.addEventListener('click', (ev) => {
        var newLinePosition = 'middle';
        if (gCurrentLine.position === 'top') {
            newLinePosition = 'bottom';
        }
        gMeme.lines.push({ ...gCurrentLine });
        gCurrentLine.value = '';
        gCurrentLine.position = newLinePosition;
        _resetTextField();
        _renderMeme()
    });
}

function _attachEventSwitchLinesFocus() {
    gSwitchLines.addEventListener('click', (ev) => {
        var nextFocusedLine = gMeme.lines.shift();
        gMeme.lines.push({ ...gCurrentLine });
        gCurrentLine = nextFocusedLine;
        _setCurrentLine()
        _renderMeme()
    });
}

function _attachEventDeleteLine() {
    gDeleteLine.addEventListener('click', (ev) => {
        if (gMeme.lines.length) {
            var newFocusedLine = gMeme.lines.shift();
            gCurrentLine = newFocusedLine;
            _setCurrentLine()
        }
        else {
            gCurrentLine.value = '';
            gTextField.value = '';
        }
        _renderMeme()
    });
}

function _attachEventSetFontFamily() {
    gFontFamily.addEventListener('change', (ev) => {
        gCurrentLine.fontFamily = ev.target.value;
        _renderMeme()
    });
}
function _attachEventAlignBtns() {
    gAlignLeft.addEventListener('click', (ev) => {
        gCurrentLine.align = 'left';
        _renderMeme()
    });
    gAlignCenter.addEventListener('click', (ev) => {
        gCurrentLine.align = 'center';
        _renderMeme()
    });
    gAlignRight.addEventListener('click', (ev) => {
        gCurrentLine.align = 'right';
        _renderMeme()
    });
}
function _attachEventDragAndDrop() {
    gCanvas.addEventListener('mousedown', (ev) => {
        gCurrentLine.offsetX = ev.offsetX;
        gCurrentLine.offsetY = ev.offsetY;
        document.body.style.cursor = 'grabbing';
        gCurrentLine.isDragged = true;
        console.log('down');
        _renderMeme();
    });
    gCanvas.addEventListener('mousemove', (ev) => {
        if (gCurrentLine.isDragged) {
            gCurrentLine.offsetX = ev.offsetX;
            gCurrentLine.offsetY = ev.offsetY;
        }
        _renderMeme();
    });
    gCanvas.addEventListener('mouseup', (ev) => {
        document.body.style.cursor = 'grab';
        gCurrentLine.isDragged = false;
        _renderMeme();
    });
}

function _setCurrentLine() {
    gTextField.value = gCurrentLine.value;
    gFontFamily.value = gCurrentLine.fontFamily;
}



function _renderMeme(forDownload) {
    var memeImage = document.getElementById(gMeme.imageId)
    gCtx.drawImage(memeImage, 0, 0, gCanvas.width, gCanvas.height);
    document.querySelector('.meme-editor').style.display = 'block';
    document.querySelector('.grid-container').style.display = 'none';

    var lines = [...gMeme.lines, gCurrentLine];

    lines.forEach(line => {
        if (!line.value || line.value.length > 0) {
            _renderLine(line, line === gCurrentLine, forDownload);
        }
    });
}

function _renderLine(line, isFocused, forDownload) {
    gCtx.font = `${line.size}px ${line.fontFamily}`;
    gCtx.textAlign = line.align;
    gCtx.textBaseline = "middle";
    var x = _getX(line.align) + line.offsetX;
    var y = _getY(line.position) + line.offsetY;
    gCtx.strokeStyle = isFocused && !forDownload ? 'red' : 'black';
    gCtx.strokeText(line.value, x, y);
    gCtx.fillStyle = line.color;
    gCtx.fillText(line.value, x, y);
}

function _getY(position) {
    switch (position) {
        case ('top'): {
            return CANVAS_PADDING
        }
        case ('middle'): {
            return CANVAS_SIZE / 2
        }
        case ('bottom'): {
            return CANVAS_SIZE - CANVAS_PADDING;
        }
    }
}

function _getX(align) {
    switch (align) {
        case ('left'): {
            return CANVAS_PADDING
        }
        case ('center'): {
            return CANVAS_SIZE / 2;
        }
        case ('right'): {
            return CANVAS_SIZE - CANVAS_PADDING;
        }
    }
}

function _getCanvasUrl() {
    return gCanvas.toDataURL();
}

function _downloadMeme() {
    _renderMeme(true);
    var link = document.createElement('a');
    link.download = `meme-${(new Date()).toISOString()}.png`;
    link.href = _getCanvasUrl();
    link.click();
    _saveMemeToLocalStorage();
    _renderMeme(false);
}

function _loadMemesFromLocalStorage() {
    return loadFromStorage(MEME_STORAGE_KEY);
}

function _saveMemeToLocalStorage() {
    var memes = _loadMemesFromLocalStorage();
    if (!memes) {
        memes = [];
    }
    memes.push(_getCanvasUrl());
    saveToStorage(MEME_STORAGE_KEY, memes)
}
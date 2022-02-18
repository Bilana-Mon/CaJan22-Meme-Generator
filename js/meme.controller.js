'use strict'

function initMeme() {
    _initMeme();
}

function setSelectedMemeId(selectedImageId) {
    _setSelectedMemeId(selectedImageId);
}

function downloadMeme() {
    _downloadMeme();
}

function shareMeme() {
    _shareMeme();
}

function getSavedMemes() {
    return _loadMemesFromLocalStorage();
}

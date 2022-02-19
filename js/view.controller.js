'use strict'

function initView() {
    _initView();
    document.querySelector('.meme-editor').style.display = 'none';
}

function openSavedMemes() {
    document.querySelector('.gallery-container').style.display = 'none';
    document.querySelector('.saved-memes-container').style.display = 'grid';
    document.querySelector('.meme-editor').style.display = 'none'
}

function openGallery() {
    document.querySelector('.gallery-container').style.display = 'grid';
    document.querySelector('.saved-memes-container').style.display = 'none';
    document.querySelector('.meme-editor').style.display = 'none'
}
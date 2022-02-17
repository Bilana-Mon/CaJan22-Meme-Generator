'use strict'

var gImgs = [
    { id: 1, url: 'assets/img/1.jpg', keywords: ['funny', 'politics'] },
    { id: 2, url: 'assets/img/2.jpg', keywords: ['cute', 'dog'] },
    { id: 3, url: 'assets/img/3.jpg', keywords: ['cute', 'dog'] },
    { id: 4, url: 'assets/img/4.jpg', keywords: ['cute', 'dog'] },
    { id: 5, url: 'assets/img/5.jpg', keywords: ['cute', 'dog'] },
    { id: 6, url: 'assets/img/6.jpg', keywords: ['cute', 'dog'] },
    { id: 7, url: 'assets/img/7.jpg', keywords: ['cute', 'dog'] },
    { id: 8, url: 'assets/img/8.jpg', keywords: ['cute', 'dog'] },
    { id: 9, url: 'assets/img/9.jpg', keywords: ['cute', 'dog'] },
    { id: 10, url: 'assets/img/10.jpg', keywords: ['cute', 'dog'] },
    { id: 11, url: 'assets/img/11.jpg', keywords: ['cute', 'dog'] },
    { id: 12, url: 'assets/img/12.jpg', keywords: ['cute', 'dog'] },
    { id: 13, url: 'assets/img/13.jpg', keywords: ['cute', 'dog'] },
    { id: 14, url: 'assets/img/14.jpg', keywords: ['cute', 'dog'] },
    { id: 15, url: 'assets/img/15.jpg', keywords: ['cute', 'dog'] },
    { id: 16, url: 'assets/img/16.jpg', keywords: ['cute', 'dog'] },
    { id: 17, url: 'assets/img/17.jpg', keywords: ['cute', 'dog'] },
    { id: 18, url: 'assets/img/18.jpg', keywords: ['cute', 'dog'] }
];

function getImgs() {
    var imgs = gImgs;
    return imgs;
}

function onImgSelect() {
    drawImageFromLocal();
    var imgs = document.querySelectorAll('.items');

    imgs.forEach(img => img.addEventListener('click', () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        document.querySelector('.meme-editor').style.display = 'block';
        document.querySelector('.grid-container').style.display = 'none';
    }));
}
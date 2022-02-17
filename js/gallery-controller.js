'use strict'

function renderGallery() {
    var imgs = getImgs();

    var strHTML = imgs.map(img => {
        return `
        <div class="img">
        <img src="${img.url}" alt="" class="items img-item-${img.id}">
        </div>`
    });
    document.querySelector('.gallery-container').innerHTML = strHTML.join('');
}

function openModal() {
    document.body.classList.toggle('modal-open');
}

function closeModal() {
    document.body.classList.remove('modal-open');
}
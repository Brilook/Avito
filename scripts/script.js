'use strict';

const modalAdd = document.querySelector('.modal__add');
const addAd = document.querySelector('.add__ad');
const modalBtnSubmit = document.querySelector('.modal__btn-submit');
const modalSubmit = document.querySelector('.modal__submit');
const modalItem = document.querySelector('.modal__item');
const catalog = document.querySelector('.catalog');

addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
});

modalAdd.addEventListener('click', event => {
    const target = event.target;

    if (target.classList.contains('modal__close') ||
        target === modalAdd) {
        modalAdd.classList.add('hide');
        modalSubmit.reset();
    }
});

// close the modal window by clicking on "Escape"
document.addEventListener('keydown', event => {
    
    if (event.code == 'Escape');
    modalAdd.classList.add('hide');
    modalItem.classList.add('hide');
    modalSubmit.reset();
});

// open modal for card
catalog.addEventListener('click', event => {
    const target = event.target;
    const card = target.closest('.card');

    if (card) {
        modalItem.classList.remove('hide');
    }
});

modalItem.addEventListener('click', () => {
    const target = event.target;

    if (target.classList.contains('modal__close') ||
        target === modalItem) {
        modalItem.classList.add('hide');
    }
});
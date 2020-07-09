'use strict';
const dataBase = [];

const modalAdd = document.querySelector('.modal__add');
const addAd = document.querySelector('.add__ad');
const modalBtnSubmit = document.querySelector('.modal__btn-submit');
const modalSubmit = document.querySelector('.modal__submit');
const modalItem = document.querySelector('.modal__item');
const catalog = document.querySelector('.catalog');
const modalSubmitElements = [...modalSubmit.elements].filter(elem => elem.tagName !== 'BUTTON');
const modalBtnWarning = document.querySelector('.modal__btn-warning');


const closeModal = function (event) {
    const target = event.target;
    if (target.closest('.modal__close') ||
        target === this) {
        this.classList.add('hide');
        if (this === modalAdd) {
            modalSubmit.reset()
        };
    }
};

const closeModalEsc = event => {
    if (event.code === 'Escape') {
        modalAdd.classList.add('hide');
        modalItem.classList.add('hide');
        modalSubmit.reset();
        document.removeEventListener('keyup', closeModalEsc);
    }
};

modalSubmit.addEventListener('input', () => {
    const validForm = modalSubmitElements.every(elem => elem.value);
    modalBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '';
});

modalSubmit.addEventListener('submit', event => {
    event.preventDefault();
    const itemObj = {};
    for (const elem of modalSubmitElements) {
        itemObj[elem.name] = elem.value;
    }
    dataBase.push(itemObj);
    modalSubmit.reset();// перенести
});

addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
    document.addEventListener('keyup', closeModalEsc);
});


catalog.addEventListener('click', event => {
    const target = event.target;
    const card = target.closest('.card');
    if (card) {
        modalItem.classList.remove('hide');
        document.addEventListener('keyup', closeModalEsc);
    }
});


modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);
'use strict';
const dataBase = JSON.parse(localStorage.getItem('awito')) || [];
let counter = dataBase.length;

const modalAdd = document.querySelector('.modal__add');
const addAd = document.querySelector('.add__ad');
const modalBtnSubmit = document.querySelector('.modal__btn-submit');
const modalSubmit = document.querySelector('.modal__submit');
const modalItem = document.querySelector('.modal__item');
const catalog = document.querySelector('.catalog');
const modalSubmitElements = [...modalSubmit.elements].filter(elem => elem.tagName !== 'BUTTON');
const modalBtnWarning = document.querySelector('.modal__btn-warning');
const modalFileInput = document.querySelector('.modal__file-input');
const modalFileBtn = document.querySelector('.modal__file-btn');
const modalImageAdd = document.querySelector('.modal__image-add');
const searchInput = document.querySelector('.search__input');
const menuContainer = document.querySelector('.menu__container');

// for changeDataModalAdd
const modalHeaderItem = document.querySelector('.modal__header-item');
const modalImageItem = document.querySelector('.modal__image-item');
const modalStatusItem = document.querySelector('.modal__status-item');
const modalDescriptionItem = document.querySelector('.modal__description-item');
const modaCostItem = document.querySelector('.modal__cost-item');

const textFileBtn = modalFileBtn.textContent;
const srcModalImage = modalImageAdd.src;

const infoPhoto = {};

const checkForm = () => {
    const validForm = modalSubmitElements.every(elem => elem.value);
    modalBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '';
};

const saveDB = () => localStorage.setItem('awito', JSON.stringify(dataBase));

const closeModal = event => {
    const target = event.target;
    if (target.closest('.modal__close') ||
        target.classList.contains('modal') ||
        event.code === 'Escape') {
        modalAdd.classList.add('hide');
        modalItem.classList.add('hide');
        document.removeEventListener('keyup', closeModal);
        modalSubmit.reset();
        modalImageAdd.src = srcModalImage;
        modalFileBtn.textContent = textFileBtn;
        checkForm();

    }
};

const renderCard = (DB = dataBase) => {
    catalog.textContent = '';

    DB.forEach((item) => {
        catalog.insertAdjacentHTML('beforeend', `
        <li class="card" data-id="${item.id}">
            <img class="card__image" src="data:image/png;base64,${item.image}" alt="test">
            <div class="card__description">
            <h3 class="card__header">${item.nameItem}</h3>
            <div class="card__price">${item.costItem} ₽</div>
            </div>
            </li>
            `);
    });
};

modalFileInput.addEventListener('change', event => {
    const target = event.target;
    const reader = new FileReader();

    const file = target.files[0];

    infoPhoto.name = file.name;
    infoPhoto.size = file.size;

    reader.readAsBinaryString(file);

    reader.addEventListener('load', event => {
        if (infoPhoto.size < 600000) {
            modalFileBtn.textContent = infoPhoto.name;
            infoPhoto.base64 = btoa(event.target.result);
            modalImageAdd.src = `data:image/png;base64,${infoPhoto.base64}`;
        } else {
            modalFileBtn.textContent = 'File size must not exceed 20kb';
            modalFileInput.value = '';
            checkForm();
        }
    });
});


const changeDataModalAdd = (id) => {
    const itemBD = dataBase.find(obj => obj.id === parseInt(id));
    modalHeaderItem.textContent = itemBD.nameItem;
    modalStatusItem.textContent = itemBD.status === 'new' ? ' Новый' : 'Б/У';
    modalDescriptionItem.textContent = itemBD.descriptionItem;
    modaCostItem.textContent = itemBD.costItem;
    modalImageItem.src = `data:image/png;base64,${itemBD.image}`;
};

searchInput.addEventListener('input', () => {
    const valueSearch = searchInput.value.trim().toLowerCase();

    if (valueSearch.length > 2) {
        const resSearch = dataBase.filter(item => item.nameItem.toLowerCase().includes(valueSearch) ||
                                                  item.descriptionItem.toLowerCase().includes(valueSearch));
        renderCard(resSearch);
    }
});

modalSubmit.addEventListener('input', checkForm);

modalSubmit.addEventListener('submit', event => {
    event.preventDefault();
    const itemObj = {};
    for (const elem of modalSubmitElements) {
        itemObj[elem.name] = elem.value;
    }
    itemObj.id = counter++;
    itemObj.image = infoPhoto.base64;
    dataBase.push(itemObj);
    closeModal({ target: modalAdd });
    saveDB();
    renderCard();
});

addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
    document.addEventListener('keyup', closeModal);
});


catalog.addEventListener('click', event => {
    const target = event.target;
    const card = target.closest('.card');
    if (card) {
        changeDataModalAdd(card.dataset.id);
        modalItem.classList.remove('hide');
        document.addEventListener('keyup', closeModal);
    }
});

menuContainer.addEventListener('click', event => {
    const target = event.target;

    if (target.tagName === 'A') {
        const result = dataBase.filter(item => item.category === target.dataset.category);
        renderCard(result);
    }
});


modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);

renderCard();
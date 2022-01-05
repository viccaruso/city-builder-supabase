import { checkAuth, logout } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const cityNameEl = document.querySelector('#city-name');
const waterImgEl = document.querySelector('#water-image');
const densityImgEl = document.querySelector('#density-image');
const parkImgEl = document.querySelector('#park-image');
const waterDropdown = document.querySelector('#water-dropdown');
const densityDropdown = document.querySelector('#density-dropdown');
const parkDropdown = document.querySelector('#park-dropdown');
const mottoContainerEl = document.querySelector('#motto-container');
const mottoInput = document.querySelector('#motto-input');
const addMottoButton = document.querySelector('#add-motto');
const setNameButton = document.querySelector('#set-name');

console.log(logoutButton,
    cityNameEl,
    waterImgEl,
    densityImgEl,
    parkImgEl,
    waterDropdown,
    densityDropdown,
    parkDropdown,
    mottoContainerEl,
    mottoInput,
    addMottoButton,
    setNameButton)
logoutButton.addEventListener('click', () => {
    logout();
});

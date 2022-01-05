import { checkAuth, createDefaultCity, fetchCity, logout } from '../fetch-utils.js';

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

let city = {};

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() => {
    // On page load attempt to fetch city from supabase
    city = await fetchCity();
    // Check if fetch was successful and if not, create row in supabase with defaults
    if (!city) {
        city = await createDefaultCity();
    }
    console.log(city);
});
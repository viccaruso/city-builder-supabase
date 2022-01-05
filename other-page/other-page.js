import { checkAuth, createDefaultCity, fetchCity, logout, updateCityDetail } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const cityNameEl = document.querySelector('#city-name');
const cityInputEl = document.querySelector('#city-input');
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

window.addEventListener('load', async () => {
    // On page load attempt to fetch city from supabase
    city = await fetchCity();

    // Check if fetch was successful and if not, create row in supabase with default values and store the returned default city in state
    if (!city) {
        city = await createDefaultCity();
    }

    // Display fresh data
    displayCity(city);
});

setNameButton.addEventListener('click', async () => {
    // Grab the name from input field and then clear field
    let data = cityInputEl.value;
    cityInputEl.value = '';
    // Update name in db and update state
    city = await updateCityDetail('name', data);
    // Display fresh data (from state)
    displayCity(city);
});

waterDropdown.addEventListener('change', async() => {
    // Grab the value from dropdown
    let data = waterDropdown.value;
    // Update detail in db and update state
    city = await updateCityDetail('water_type', data);
    // Display fresh data (from state)
    displayCity(city);
});

densityDropdown.addEventListener('change', async() => {
    // Grab the value from dropdown
    let data = densityDropdown.value;
    // Update detail in db and update state
    city = await updateCityDetail('density_type', data);
    // Display fresh data (from state)
    displayCity(city);
});

parkDropdown.addEventListener('change', async() => {
    // Grab the value from dropdown
    let data = parkDropdown.value;
    // Update detail in db and update state
    city = await updateCityDetail('park_type', data);
    // Display fresh data (from state)
    displayCity(city);
});

addMottoButton.addEventListener('click', async() => {
    // Grab motto from input field and clear field
    let data = mottoInput.value;
    mottoInput.value = '';
    // Add motto to array in state
    city.mottos.push(data);
    // Update mottos in db and also update state
    city = await updateCityDetail('mottos', city.mottos);
    // Display fresh data (from state)
    displayCity(city);
});

function displayCity(city) {
    // Display details on DOM from state
    // Display city name
    cityNameEl.textContent = city.name;

    // Display image sources
    waterImgEl.src = `../assets/water-${city.water_type}.jpeg`;
    densityImgEl.src = `../assets/density-${city.density_type}.jpeg`;
    parkImgEl.src = `../assets/park-${city.park_type}.jpeg`;

    // Display dropdown values
    waterDropdown.value = city.water_type;
    densityDropdown.value = city.density_type;
    parkDropdown.value = city.park_type;

    // Display mottos
        // Remove all mottos from DOM
    while (mottoContainerEl.firstChild) {
        mottoContainerEl.firstChild.remove();
    }
        // Add all mottos back to DOM
    for (let motto of city.mottos) {
        let p = document.createElement('p');
        p.textContent = motto;
        p.style.textAlign = 'center';
        mottoContainerEl.append(p);
    }

}
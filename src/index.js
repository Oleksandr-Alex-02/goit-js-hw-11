// import URL from './url.js';
import cards from './templates/cards.hbs';

const searchForm = document.querySelector('#search-form');
const sdf = document.querySelector('button[type="submit"]');
const gallery = document.querySelector('.gallery');
const clickBtn = document.querySelector('.load-more');
// const jsGuard = document.querySelector('.js-guard');
sdf.setAttribute('disabled', true);

let page = 0;
let value = '';

// const options = {
//   root: null,
//   rootMargin: '10px',
//   threshold: 1,
// };

searchForm.addEventListener('submit', input);
clickBtn.addEventListener('click', scrol);

function input(e) {
  sdf.setAttribute('disabled', true);
  e.preventDefault();
  value = e.currentTarget.elements.searchQuery.value;
  htmlMarkup();
  e.target.reset();
}

function htmlMarkup() {
  gallery.innerHTML = '';
  // page = 0;

  URL((page = 1)).then(data => {
    const markup = cards(data.hits);
    gallery.insertAdjacentHTML('beforeend', markup);
    // observer.observe(jsGuard);
    const totalHits = data.totalHits;
    sms(totalHits);
    console.log(totalHits);
    console.log(data);
  });
}

// const observer = new IntersectionObserver(updateList, options);

// function updateList(entries) {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       URL((page += 1)).then(data => {
//         const markup = cards(data.hits);
//         gallery.insertAdjacentHTML('beforeend', markup);
//       });
//     }
//   });
// }

function scrol(e) {
  URL((page += 1)).then(data => {
    const markup = cards(data.hits);
    gallery.insertAdjacentHTML('beforeend', markup);
  });
}

function URL(page) {
  const URL = 'https://pixabay.com/api/';
  const KEY = 'key=29453019-5a69b6c7b2f01a070c80deb0c';
  const params = `&image_type=photo&orientation=horizontal&safesearch=true&per_page=9`;

  return fetch(`${URL}?${KEY}&q=${value}${params}&page=${page}`).then(resp =>
    resp.json()
  );
}

function sms(totalHits) {
  if (totalHits >= 1) {
    console.log('Ура нашли котіков');
  }
  if (totalHits === 0) {
    console.log('печалька');
  }
  if (page === totalHits) {
    console.log("We're sorry, but you've reached the end of search results.");
  }
}

searchForm.addEventListener('input', disabled);
function disabled(e) {
  value = e.currentTarget.elements.searchQuery.value;
  if (value !== '') {
    sdf.removeAttribute('disabled');
    return;
  }
  if (value === '') {
    sdf.setAttribute('disabled', true);
    return;
  }
}

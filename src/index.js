// import URL from './url.js';
import cards from './templates/cards.hbs';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const clickBtn = document.querySelector('.button');
// const jsGuard = document.querySelector('.js-guard');

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

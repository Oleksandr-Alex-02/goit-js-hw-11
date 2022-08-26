// import URL from './url.js';
import cards from './templates/cards.hbs';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '400px',
  position: 'right-top',
  distance: '10px',
  borderRadius: '50px',
  timeout: 3000,
});

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

searchForm.addEventListener('submit', startScript);
clickBtn.addEventListener('click', loadMore);

function startScript(e) {
  sdf.setAttribute('disabled', true);
  e.preventDefault();
  value = e.currentTarget.elements.searchQuery.value;
  htmlMarkup();
  sms({ value });
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
    const arrLength = data.hits.length;
    sms({ totalHits, value, arrLength });
    console.log(data.hits.length);
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

function loadMore(e) {
  URL((page += 1)).then(data => {
    const markup = cards(data.hits);
    gallery.insertAdjacentHTML('beforeend', markup);
  });
}

async function URL(page) {
  const URL = 'https://pixabay.com/api/';
  const KEY = 'key=29453019-5a69b6c7b2f01a070c80deb0c';
  const params = `&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;

  return await fetch(`${URL}?${KEY}&q=${value}${params}&page=${page}`).then(
    resp => resp.json()
  );
}

// function wiwi() {
//   clickBtn.removeAttribute('disabled');
// }

function sms({ totalHits, value, arrLength }) {
  const nuber = 40;
  console.log(nuber);
  console.log(arrLength);
  if (totalHits >= 1) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} ${value}.`);
    return;
  }
  if (totalHits === 0) {
    Notiflix.Notify.failure(
      `Sorry, there are no images ${value} matching your search query. Please try again.`
    );
    return;
  }
  if (arrLength !== nuber) {
    console.log(arrLength);
    console.log("We're sorry, but you've reached the end of search results.");
    return;
  }
}

searchForm.addEventListener('input', disabled);
function disabled(e) {
  value = e.currentTarget.elements.searchQuery.value;
  if (value !== '') {
    sdf.removeAttribute('disabled');
    return;
  } else {
    sdf.setAttribute('disabled', true);
  }
}

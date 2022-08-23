import URL from './url.js';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const btnSubmit = document.querySelector('button[type="submit"]');

btnSubmit.addEventListener('submit', hjhj);

function hjhj(e) {
  e.preventDefault();
}

console.log(URL());

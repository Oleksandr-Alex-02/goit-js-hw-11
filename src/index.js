import FethApiServes from './url';
import cards from './templates/cards.hbs';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '400px',
  position: 'right-top',
  distance: '10px',
  borderRadius: '50px',
  // timeout: 1000,
});

const newApiServer = new FethApiServes();

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const clickBtn = document.querySelector('.load-more');
const btnSubmit = document.querySelector('button[type="submit"]');
disabledBtnSearch();

searchForm.addEventListener('submit', startScript);
clickBtn.addEventListener('click', httpsRequest);

function startScript(e) {
  disabledBtnSearch();
  e.preventDefault();

  clickBtn.classList.remove('is-hiden');
  removeGallery();
  newApiServer.query = e.currentTarget.elements.searchQuery.value;
  newApiServer.resetPege();
  httpsRequest();
  e.target.reset();
}

async function httpsRequest() {
  const ara = await newApiServer.fethApiServes();
  const totalHits = Math.ceil(ara.totalHits / newApiServer.per_page);
  const arr = await ara.hits;
  if (arr.length === 0) {
    Notiflix.Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
  }
  if (totalHits === newApiServer.page - 1) {
    console.log(`We're sorry, but you've reached the end of search results.`);
    clickBtn.classList.add('is-hiden');
  }
  markupGallery(arr);
}

async function markupGallery(hits) {
  gallery.insertAdjacentHTML('beforeend', cards(hits));
}

function removeGallery() {
  gallery.innerHTML = '';
}

function disabledBtnSearch() {
  btnSubmit.setAttribute('disabled', true);
}

searchForm.addEventListener('input', controlBtnDisabled);
function controlBtnDisabled(e) {
  value = e.currentTarget.elements.searchQuery.value;
  if (value !== '') {
    btnSubmit.removeAttribute('disabled');
    return;
  } else {
    disabledBtnSearch();
  }
}

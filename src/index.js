import FethApiServes from './url';
import cards from './templates/cards.hbs';

const newApiServer = new FethApiServes();

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const clickBtn = document.querySelector('.load-more');
const btnSubmit = document.querySelector('button[type="submit"]');

btnSubmit.setAttribute('disabled', true);

searchForm.addEventListener('submit', startScript);
clickBtn.addEventListener('click', httpsRequest);

function startScript(e) {
  btnSubmit.setAttribute('disabled', true);
  e.preventDefault();

  removeGallery();
  newApiServer.query = e.currentTarget.elements.searchQuery.value;
  newApiServer.resetPege();
  httpsRequest();
  e.target.reset();
}

function httpsRequest() {
  newApiServer.fethApiServes().then(markupGallery);
}

function markupGallery(hits) {
  gallery.insertAdjacentHTML('beforeend', cards(hits));
}

function removeGallery() {
  gallery.innerHTML = '';
}

searchForm.addEventListener('input', disabled);
function disabled(e) {
  value = e.currentTarget.elements.searchQuery.value;
  if (value !== '') {
    btnSubmit.removeAttribute('disabled');
    return;
  } else {
    btnSubmit.setAttribute('disabled', true);
  }
}

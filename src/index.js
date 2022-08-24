const searchForm = document.querySelector('#search-form');
const searchQuery = searchForm.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const btnSubmit = document.querySelector('button[type="button"]');

btnSubmit.addEventListener('click', value);

const URL = 'https://pixabay.com/api/';
const KEY = 'key=29453019-5a69b6c7b2f01a070c80deb0c';
const OPHIN = `&q=cat&image_type=photo&orientation=horizontal&safesearch=true&per_page=10&page=1`;

function cat(obj) {
  return fetch(`${URL}?${KEY}${OPHIN}`).then(res => {
    if (!res.ok) {
      console.log(res.status);
    }
    return res.json();
  });
}

function value(obj) {
  const zviri = searchQuery.value;
  console.log(zviri);
  cat()
    .then(data => console.log(data.hits))
    .catch(error);
}

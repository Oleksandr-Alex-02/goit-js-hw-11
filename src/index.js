// import URL from './url.js';
import axios from 'axios';
const axios = require('axios');

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

searchForm.addEventListener('submit', URL);
let searchImages = '';

function URL(e) {
  const URL = 'https://pixabay.com/api/';
  const KEY = 'key=29453019-5a69b6c7b2f01a070c80deb0c';
  const OPHIN = `&image_type=photo&orientation=horizontal&safesearch=true`;

  searchImages = e.currentTarget.elements.searchQuery.value;
  e.preventDefault();
  return axios
    .get(`${URL}?${KEY}${OPHIN}&q=${searchImages}`)
    .then(res => {
      markup(res);
    })
    .catch(error => {
      // handle error
      console.log(error);
    });
}

function markup(res) {
  const aaa = res.data.hits;
  const markup = aaa
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes: ${likes}</b>
              </p>
              <p class="info-item">
                <b>Views: ${views}</b>
              </p>
              <p class="info-item">
                <b>Comments: ${comments}</b>
              </p>
              <p class="info-item">
                <b>Downloads: ${downloads}</b>
              </p>
            </div>
        </div>`;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('afterbegin', markup);
}

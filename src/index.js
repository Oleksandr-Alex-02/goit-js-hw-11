import axios from 'axios';
const axios = require('axios');

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const btnSubmit = document.querySelector('button[type="submit"]');

const searchImages = 'cat';

const URL = 'https://pixabay.com/api/';
const KEY = 'key=29453019-5a69b6c7b2f01a070c80deb0c';
const OPHIN = `&q=${searchImages}&image_type=photo&orientation=horizontal&safesearch=true`;

// btnSubmit.addEventListener('submit', doka);

function sss(obj) {
  return axios
    .get(`${URL}?${KEY}${OPHIN}`)
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
  // console.log(markup);
  return markup;
}

const markupa = sss();
gallery.insertAdjacentHTML('afterbegin', markupa);

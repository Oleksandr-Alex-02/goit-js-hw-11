import axios from 'axios';
const axios = require('axios');
const searchImages = 'cat';

const URL = 'https://pixabay.com/api/';
const KEY = 'key=29453019-5a69b6c7b2f01a070c80deb0c';
const OPHIN = `&q=${searchImages}&image_type=photo&orientation=horizontal&safesearch=true`;

export default function doka() {
  axios
    .get(`${URL}?${KEY}${OPHIN}`)
    .then(function (rea) {
      // handle success
      console.log(rea.data.hits);
      const fff = rea.data.hits;
      console.log(fff[5].largeImageURL);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}
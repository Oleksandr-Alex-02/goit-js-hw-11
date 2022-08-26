// import axios from 'axios';
// const axios = require('axios');
// import value from './index.js';

export default class NewApiServer {
  constructor() {
    this.valueInput = '';
    this.page = 1;
  }

  fethApiServes() {
    const URL =
      'https://pixabay.com/api/?key=29453019-5a69b6c7b2f01a070c80deb0c';
    // const KEY = 'key=29453019-5a69b6c7b2f01a070c80deb0c';
    const params = `&image_type=photo&orientation=horizontal&safesearch=true&per_page=10&q=${this.valueInput}&page=${this.page}`;

    return fetch(`${URL}${params}`)
      .then(resp => resp.json())
      .then(({ hits }) => {
        this.nextPage();

        return hits;
      });
  }
  nextPage() {
    this.page += 1;
  }

  resetPege() {
    this.page = 1;
  }

  get query() {
    return this.valueInput;
  }
  set query(neQuery) {
    this.valueInput = neQuery;
  }
}

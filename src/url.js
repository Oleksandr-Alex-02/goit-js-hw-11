axios.get('/user', {
  params: {
    ID: 12345,
  },
});

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

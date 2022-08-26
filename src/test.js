import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '400px',
  position: 'right-top',
  distance: '10px',
  borderRadius: '50px',
  timeout: 1000,
});

// const jsGuard = document.querySelector('.js-guard');

// const options = {
//   root: null,
//   rootMargin: '10px',
//   threshold: 1,
// };

function startScript(e) {
  sms({ value });
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

// async function URL(page) {
//   const URL = 'https://pixabay.com/api/';
//   const KEY = 'key=29453019-5a69b6c7b2f01a070c80deb0c';
//   const params = `&image_type=photo&orientation=horizontal&safesearch=true&per_page=10`;

//   return await fetch(`${URL}?${KEY}&q=${value}${params}&page=${page}`).then(
//     resp => resp.json()
//   );
// }

// function wiwi() {
//   clickBtn.removeAttribute('disabled');
// }

function sms({ totalHits, value, arrLength }) {
  const allPages = Math.ceil(totalHits / 10);
  if (totalHits >= 1) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} ${value}.`);
  }
  if (totalHits === 0) {
    Notiflix.Notify.failure(
      `Sorry, there are no images ${value} matching your search query. Please try again.`
    );
  }
}

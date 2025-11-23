import iziToast from 'izitoast';
import errorUrl from './img/error.svg';
import cautionUrl from './img/caution.svg';
import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  showLoader,
} from './js/render-functions';

export const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const query = e.target.elements.search_text.value.trim();

  if (query === '') {
    iziToast.warning({
      title: 'Caution',
      message: 'The search field cannot be empty',
      position: 'topRight',
      backgroundColor: '#ffa000',
      titleColor: '#fff',
      messageColor: '#fff',
      progressBarColor: '#bb7b10',
      close: true,
      iconUrl: cautionUrl,
      class: 'my-toast',
    });

    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(images => {
      if (images.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          backgroundColor: '#ef4040',
          titleColor: '#fff',
          messageColor: '#fff',
          progressBarColor: '#b51b1b',
          close: true,
          iconUrl: errorUrl,
          class: 'my-toast',
        });

        return;
      }

      createGallery(images);
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
        position: 'topRight',
        backgroundColor: '#ef4040',
        titleColor: '#fff',
        messageColor: '#fff',
        progressBarColor: '#b51b1b',
        close: true,
        iconUrl: errorUrl,
        class: 'my-toast',
      });
    })
    .finally(hideLoader);
}

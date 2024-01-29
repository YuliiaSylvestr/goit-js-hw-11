import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  galleryContainer: document.querySelector('.gallery'),
  form: document.querySelector('.form'),
  searchInput: document.querySelector('.input'),
};

function createGalleryimagesMarkup(images) {
  return images
    .map(
      ({
        previewURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img
            class="gallery-image"
            src="${previewURL}"
            data-source="${largeImageURL}"
            alt="${tags}"
          />
          <div class="stats">
            <div class="stats-item">
              <span class="stats-item-title">Likes</span>
              <span class="stats-item-value">${likes}</span>
            </div>
            <div class="stats-item">
              <span class="stats-item-title">Views</span>
              <span class="stats-item-value">${views}</span>
            </div>
            <div class="stats-item">
              <span class="stats-item-title">Comments</span>
              <span class="stats-item-value">${comments}</span>
            </div>
            <div class="stats-item">
              <span class="stats-item-title">Downloads</span>
              <span class="stats-item-value">${downloads}</span>
            </div>
          </div>
        </a>
      </li>`;
      }
    )
    .join('');
}

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: '250',
  captionType: 'alt',
});

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  const searchValue = refs.searchInput.value;
  refs.galleryContainer.innerHTML = `
    <div class="loader"></div>
  `;
  fetch(
    `https://pixabay.com/api/?key=42081820-380f934f7feb19076f66ce532&q=${encodeURI(
      searchValue
    )}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(res => res.json())
    .then(data => {
      const images = data.hits;
      if (images.length === 0) {
        iziToast.error({
          title:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          backgroundColor: '#f53d3d',
          titleColor: 'white',
          progressBar: false,
          icon: '',
        });
        refs.galleryContainer.innerHTML = ``;
        return;
      }
      const imagesMarkup = createGalleryimagesMarkup(images);
      refs.galleryContainer.innerHTML = imagesMarkup;
      gallery.refresh();
    })
    .catch(() => {
      refs.galleryContainer.innerHTML = ``;
      iziToast.error({
        title: 'Sorry, something went wrong. Please try again!',
        position: 'topRight',
        backgroundColor: '#f53d3d',
        titleColor: 'white',
        progressBar: false,
        icon: '',
      });
    });
});

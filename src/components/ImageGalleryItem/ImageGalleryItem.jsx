import React from 'react';

import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ image }) {
  return (
    <li className={styles.galleryItem}>
      <a href={image.largeImageURL} data-lightbox="gallery">
        <img src={image.webformatURL} alt={image.tags} />
      </a>
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};

import React, { useEffect, useRef } from 'react';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import PropTypes from 'prop-types';

import styles from './ImageGallery.module.css';

export default function ImageGallery({ images }) {
  const lightboxRef = useRef(null);

  useEffect(() => {
    if (lightboxRef.current) {
      lightboxRef.current.refresh();
    } else {
      lightboxRef.current = new SimpleLightbox(`.${styles.gallery} a`);
    }

    return () => {
      if (lightboxRef.current) {
        lightboxRef.current.destroy();
      }
    };
  });

  return (
    <ul className={styles.gallery}>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};

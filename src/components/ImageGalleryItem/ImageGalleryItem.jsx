import React, { Component } from 'react';

import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  render() {
    return (
      <li className={styles.galleryItem}>
        <a href={this.props.image.largeImageURL} data-lightbox="gallery">
          <img
            src={this.props.image.webformatURL}
            alt={this.props.image.tags}
          />
        </a>
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;

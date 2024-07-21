import React, { useState, useEffect } from 'react';

import axios from 'axios';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import LoaderComponent from './Loader';
import Button from './Button';

import PropTypes from 'prop-types';

import styles from './App.module.css';

const API_KEY = '43911097-2767f3575ad906659ba392cfc';
const PER_PAGE = 12;

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query === '') return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
        );
        setImages(prevImages => [...prevImages, ...response.data.hits]);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearchSubmit = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} />
      {loading && <LoaderComponent />}
      {images.length > 0 && !loading && <Button onClick={handleLoadMore} />}
    </div>
  );
}

App.propTypes = {
  Searchbar: PropTypes.shape({
    onSubmit: PropTypes.func.isRequired,
  }),
  ImageGallery: PropTypes.shape({
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
  Button: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
  }),
};

import React, { Component } from 'react';

import axios from 'axios';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import LoaderComponent from './Loader';
import Button from './Button';

import PropTypes from 'prop-types';

import styles from './App.module.css';

const API_KEY = '43911097-2767f3575ad906659ba392cfc';
const PER_PAGE = 12;

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;

    if (query === '') return;

    this.setState({ loading: true });
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
      );
      this.setState(prevState => ({
        images: [...prevState.images, ...response.data.hits],
        loading: false,
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({ loading: false });
    }
  };

  handleSearchSubmit = newQuery => {
    this.setState({
      query: newQuery,
      images: [],
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, loading } = this.state;

    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} />
        {loading && <LoaderComponent />}
        {images.length > 0 && !loading && (
          <Button onClick={this.handleLoadMore} />
        )}
      </div>
    );
  }
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

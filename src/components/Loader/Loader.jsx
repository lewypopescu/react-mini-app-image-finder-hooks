import React, { Component } from 'react';

import { Audio } from 'react-loader-spinner';

import styles from './Loader.module.css';

class LoaderComponent extends Component {
  render() {
    return (
      <div className={styles.loader}>
        <Audio
          height="80"
          width="80"
          radius="9"
          color="blue"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }
}

export default LoaderComponent;

import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import axios from 'axios';
import css from './App.module.css';
import { fetchImagesWithQuery } from './Api/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

axios.defaults.baseURL = 'https://pixabay.com/api';
export class App extends Component {
  state = {
    images: [],
    pageNr: 1,
    totalHits: 0,
    isLoading: false,
    error: null,
    searchQuery: '',
    showModal: false,
    largeImageURL: '',
    webformatURL: '',
  };

  handleEsc = event => {
    if (event.key === 'Escape') {
      this.setState({ showModal: false });
    }
  };
  hideModal = event => {
    if (event.target.nodeName !== 'IMG') {
      this.setState({ showModal: false });
    }
  };

  handleSubmit = query => {
    this.setState({
      searchQuery: query,
    });
    this.setState({
      pageNr: 1,
    });
  };
  handlemodal = evt => {
    const { src, alt } = evt.target;

    this.setState({ largeImageURL: src });
    this.setState({ webformatURL: alt });
    this.setState({ showModal: true });
  };
  handleLoadMore = () => {
    this.setState(prevState => {
      return { pageNr: prevState.pageNr + 1 };
    });
  };
  handleImagesRequest = async (searchQuery, pageNr) => {
    this.setState({ isLoading: true });
    try {
      const fetchData = await fetchImagesWithQuery(searchQuery, pageNr);
      const { images } = fetchData;
      const { totalHits } = fetchData;
      if (pageNr > 1) {
        this.setState(prevState => ({
          images: prevState.images.concat(images),
        }));
      } else {
        this.setState({ images });
      }
      this.setState({ totalHits });
    } catch (error) {
      this.setState({
        error: error.message,
      });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };
  componentDidUpdate(_prevProps, prevState) {
    if (
      (prevState.searchQuery !== this.state.searchQuery ||
        prevState.pageNr !== this.state.pageNr) &&
      this.state.searchQuery.length > 1
    ) {
      this.handleImagesRequest(this.state.searchQuery, this.state.pageNr);
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc, false);
  }
  render() {
    const {
      images,
      isLoading,
      error,
      searchQuery,
      totalHits,
      showModal,
      webformatURL,
      largeImageURL,
    } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        {!isLoading && images.length > 0 && (
          <ImageGallery images={images} onClick={this.handlemodal} />
        )}
        {!isLoading && images.length < totalHits && (
          <Button onClick={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal
            onClick={this.hideModal}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
          />
        )}
        {isLoading && <Loader />}
      </div>
    );
  }
}

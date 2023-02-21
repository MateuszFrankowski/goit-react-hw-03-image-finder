// import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import React, { PureComponent } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends PureComponent {
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({});
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  render() {
    const { images } = this.props;
    const { onClick } = this.props;

    return (
      <div>
        <ul className={css.ImageGallery}>
          {images.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              id={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              onClick={onClick}
            />
          ))}
        </ul>{' '}
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={el => {
            this.messagesEnd = el;
          }}
        ></div>
      </div>
    );
  }
}

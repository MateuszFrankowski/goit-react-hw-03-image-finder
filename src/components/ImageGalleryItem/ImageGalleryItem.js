import css from './ImageGalleryItem.module.css';
import React, { PureComponent } from 'react';

export class ImageGalleryItem extends PureComponent {
  render() {
    const { id, webformatURL, largeImageURL, onClick } = this.props;
    return (
      <li key={id} className={css['ImageGalleryItem']} onClick={onClick}>
        <img
          className={css['ImageGalleryItem-image']}
          src={webformatURL}
          alt={largeImageURL}
          id={id}
        />
      </li>
    );
  }
}

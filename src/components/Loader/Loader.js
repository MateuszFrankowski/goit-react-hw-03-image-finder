import React, { PureComponent } from 'react';
import css from './Loader.module.css';
import { ColorRing } from 'react-loader-spinner';
export class Loader extends PureComponent {
  render() {
    return (
      <div className={css.Center}>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
    );
  }
}

import css from './Button.module.css';
import React, { PureComponent } from 'react';

export class Button extends PureComponent {
  render() {
    const { onClick } = this.props;
    return (
      <button type="button" className={css.Button} onClick={onClick}>
        Load More
      </button>
    );
  }
}

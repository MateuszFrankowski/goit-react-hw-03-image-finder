import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import React, { Component } from 'react';
import { nanoid } from 'nanoid';
export class Searchbar extends Component {
  state = { query: '' };
  searchInputId = nanoid();
  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.query);
  };
  handleChange = evt => {
    const { value, name } = evt.target;
    if (name === 'query') {
      this.setState({ query: value });
    }
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css['button-label']}>Search</span>
          </button>

          <input
            onChange={this.handleChange}
            key={this.searchInputId}
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

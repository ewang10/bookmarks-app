import React, { Component } from 'react';
import BookmarksContext from '../BookmarksContext';
import BookmarkItem from '../BookmarkItem/BookmarkItem';
import PropTypes from 'prop-types';
import './BookmarkList.css'

class BookmarkList extends Component {
  static defaultProps = {
    bookmarks: []
  };
  static contextType = BookmarksContext;
  render() {
    const {bookmarks} = this.context;
    return (
      <section className='BookmarkList'>
        <h2>Your bookmarks</h2>
        <ul className='BookmarkList__list' aria-live='polite'>
          {bookmarks.map(bookmark =>
            <BookmarkItem
              key={bookmark.id}
              {...bookmark}
            />
          )}
        </ul>
      </section>
    );
  }
}

BookmarkList.prototypes = {
  bookmarks: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    rating: PropTypes.number,
    description: PropTypes.string
  }))
}

export default BookmarkList;

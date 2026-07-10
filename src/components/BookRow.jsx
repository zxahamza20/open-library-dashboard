import React from 'react';
import { Link } from 'react-router-dom';

const BookRow = ({ book }) => {
  const hasKnownPages = book.pages !== null;

  return (
    <div className="book-row">
      <div className="book-info text-left">
        <Link to={`/book/${encodeURIComponent(book.id)}`} className="book-title-link">
          <span className="book-title">{book.title}</span>
        </Link>
        <span className="book-author">by {book.author}</span>
      </div>
      <div className="book-meta-field text-center subject-tag">
        {book.subject.toUpperCase()}
      </div>
      <div className="book-meta-field text-center">
        {book.publishYear}
      </div>
      <div className={hasKnownPages ? "book-meta-field text-center highlight-metric" : "book-meta-field text-center unknown-value"}>
        {hasKnownPages ? `${book.pages} pages` : 'N/A'}
      </div>
      <div className="book-meta-field text-center code-style">
        {book.language}
      </div>
    </div>
  );
};

export default BookRow;
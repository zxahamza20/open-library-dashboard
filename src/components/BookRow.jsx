import React from 'react';

const BookRow = ({ book }) => {
  return (
    <div className="book-row">
      <div className="book-info">
        <span className="book-title">{book.title}</span>
        <span className="book-author">by {book.author}</span>
      </div>
      <div className="book-meta-field text-center">
        {book.publishYear}
      </div>
      <div className="book-meta-field text-center highlight-metric">
        {book.pages} pages
      </div>
      <div className="book-meta-field text-center code-style">
        {book.language}
      </div>
    </div>
  );
};

export default BookRow;
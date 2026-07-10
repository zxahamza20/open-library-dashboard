import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBooks } from '../context/BooksContext';

const extractDescription = (raw) => {
  if (!raw) return null;
  if (typeof raw === 'string') return raw;
  if (typeof raw === 'object' && raw.value) return raw.value;
  return null;
};

const BookDetail = () => {
  const { id } = useParams();
  const decodedId = decodeURIComponent(id);
  const { books, loading: booksLoading } = useBooks();

  const [extraInfo, setExtraInfo] = useState(null);
  const [extraLoading, setExtraLoading] = useState(true);
  const [extraError, setExtraError] = useState(false);

  const book = books.find((b) => b.id === decodedId);

  useEffect(() => {
    if (!decodedId.startsWith('/works/')) {
      setExtraLoading(false);
      return;
    }

    let cancelled = false;
    setExtraLoading(true);
    setExtraError(false);

    fetch(`https://openlibrary.org${decodedId}.json`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setExtraInfo({
          description: extractDescription(data.description),
          subjects: Array.isArray(data.subjects) ? data.subjects.slice(0, 12) : [],
          covers: Array.isArray(data.covers) ? data.covers : []
        });
        setExtraLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setExtraError(true);
        setExtraLoading(false);
      });

    return () => { cancelled = true; };
  }, [decodedId]);

  if (booksLoading) {
    return <div className="app-container"><div className="loading-state">Loading book records...</div></div>;
  }

  if (!book) {
    return (
      <div className="app-container">
        <div className="no-results">
          Couldn't find that book in the currently loaded dataset.
          <div style={{ marginTop: '1rem' }}>
            <Link to="/" className="page-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
              &larr; Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const coverUrl = book.coverId
    ? `https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`
    : null;

  return (
    <div className="app-container">
      <Link to="/" className="back-link">&larr; Back to Dashboard</Link>

      <div className="detail-card">
        <div className="detail-header">
          {coverUrl && (
            <img src={coverUrl} alt={`Cover of ${book.title}`} className="detail-cover" />
          )}
          <div className="detail-header-text">
            <h1>{book.title}</h1>
            <p className="detail-author">by {book.author}</p>
            <div className="detail-tags">
              <span className="subject-tag">{book.subject.toUpperCase()}</span>
              <span className="code-style">{book.language}</span>
            </div>
          </div>
        </div>

        <div className="detail-stats-grid">
          <div className="detail-stat">
            <span className="detail-stat-label">Publish Year</span>
            <span className="detail-stat-value">{book.publishYear}</span>
          </div>
          <div className="detail-stat">
            <span className="detail-stat-label">Median Pages</span>
            <span className="detail-stat-value">{book.pages !== null ? book.pages : 'N/A'}</span>
          </div>
          <div className="detail-stat">
            <span className="detail-stat-label">Known Editions</span>
            <span className="detail-stat-value">{book.editionCount !== null ? book.editionCount : 'N/A'}</span>
          </div>
        </div>

        <div className="detail-section">
          <h2>Description</h2>
          {extraLoading ? (
            <p className="detail-placeholder">Loading extended details...</p>
          ) : extraError ? (
            <p className="detail-placeholder">Extended details couldn't be loaded for this record.</p>
          ) : extraInfo?.description ? (
            <p className="detail-description">{extraInfo.description}</p>
          ) : (
            <p className="detail-placeholder">No description available for this work.</p>
          )}
        </div>

        {!extraLoading && extraInfo?.subjects?.length > 0 && (
          <div className="detail-section">
            <h2>Related Subjects</h2>
            <div className="detail-subject-list">
              {extraInfo.subjects.map((s) => (
                <span key={s} className="detail-subject-pill">{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
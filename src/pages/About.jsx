import React from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../context/BooksContext';

const About = () => {
  const { books, loading } = useBooks();

  return (
    <div className="app-container">
      <Link to="/" className="back-link">&larr; Back to Dashboard</Link>

      <div className="detail-card">
        <h1>About This Data</h1>
        <p className="detail-description">
          This dashboard pulls live data from the{' '}
          <a href="https://openlibrary.org/developers/api" target="_blank" rel="noreferrer" className="inline-link">
            Open Library Search API
          </a>. On load, it fires six parallel requests — one per subject
          (history, art, fantasy, science, fiction, non-fiction) — and merges
          the results into a single deduplicated list of{' '}
          {loading ? 'books' : `${books.length} books`}.
        </p>

        <div className="detail-section">
          <h2>Why some page counts show "N/A"</h2>
          <p className="detail-description">
            Open Library's <code>number_of_pages_median</code> field isn't
            populated for every work, even when explicitly requested. Rather
            than inventing a plausible-looking number to fill the gap, this
            dashboard leaves those records marked as unknown and excludes
            them from the average-page-length calculation. You'll see how
            many of the currently filtered books actually have a known page
            count directly under the "Average Volume Length" stat.
          </p>
        </div>

        <div className="detail-section">
          <h2>Why the decade chart skips some decades</h2>
          <p className="detail-description">
            The "Average Page Length by Decade" chart only includes decades
            with at least two books that have a known page count. A decade
            represented by a single unusually long or short book would
            produce a misleading spike, so those are left out rather than
            plotted as if they were representative.
          </p>
        </div>

        <div className="detail-section">
          <h2>Reading the subject and page-length filters together</h2>
          <p className="detail-description">
            If you're exploring how volume length varies by genre, try
            setting the Subject filter to one category at a time and
            watching both the "Average Volume Length" stat and the decade
            chart update. Fantasy and history tend to have long tails toward
            very high page counts (multi-book omnibus editions), which can
            pull an average up more than a typical single volume would
            suggest — worth keeping in mind when comparing genres directly.
          </p>
        </div>

        <div className="detail-section">
          <h2>Known limitations</h2>
          <p className="detail-description">
            Language is reported per work, not per edition, so a book with
            translations available may only show its original language code.
            Subject classification comes from which Open Library subject feed
            a work was pulled from, not a full taxonomy — a book could
            reasonably belong to more than one of the six categories shown
            here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
import React from 'react';
import { NavLink, Link, useSearchParams, useLocation } from 'react-router-dom';
import { useBooks } from '../context/BooksContext';

const Sidebar = () => {
  const { books, loading, SUBJECTS } = useBooks();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const activeSubject = location.pathname === '/'
    ? (searchParams.get('subject') || 'All')
    : null;

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-emoji">📚</span>
        <div>
          <div className="sidebar-title">Open Library</div>
          <div className="sidebar-subtitle">Analytics</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
        >
          About This Data
        </NavLink>

        <div className="sidebar-section-label">Jump to Subject</div>

        <Link
          to="/"
          className={`sidebar-subject-link${activeSubject === 'All' ? ' active' : ''}`}
        >
          All Subjects
        </Link>
        {SUBJECTS.map((subject) => (
          <Link
            key={subject}
            to={`/?subject=${subject}`}
            className={`sidebar-subject-link${activeSubject === subject ? ' active' : ''}`}
          >
            {subject.charAt(0).toUpperCase() + subject.slice(1)}
          </Link>
        ))}
      </nav>

      <div className="sidebar-meta">
        <div className="sidebar-meta-label">Records loaded</div>
        <div className="sidebar-meta-value">{loading ? '…' : books.length}</div>
      </div>

      <div className="sidebar-footer">
        Data via the Open Library Search API
      </div>
    </aside>
  );
};

export default Sidebar;
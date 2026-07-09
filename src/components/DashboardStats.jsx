import React from 'react';

const DashboardStats = ({ currentData, totalPool }) => {
  const visibleCount = currentData.length;

  const booksWithKnownPages = currentData.filter(b => b.pages !== null);
  const knownPagesCount = booksWithKnownPages.length;

  const averagePages = knownPagesCount > 0
    ? Math.round(booksWithKnownPages.reduce((acc, curr) => acc + curr.pages, 0) / knownPagesCount)
    : null;

  const oldestYear = visibleCount > 0 
    ? Math.min(...currentData.map(b => b.publishYear)) 
    : 'N/A';

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Total Matching Records</h3>
        <p className="stat-val">{visibleCount} <span className="pool-size">/ {totalPool} total</span></p>
      </div>
      <div className="stat-card">
        <h3>Average Volume Length</h3>
        <p className="stat-val">
          {averagePages !== null ? averagePages : 'N/A'} <span className="stat-unit">pages</span>
        </p>
        <p className="stat-caveat">
          {knownPagesCount > 0
            ? `Based on ${knownPagesCount} of ${visibleCount} books with a known page count`
            : 'No books in this selection have a known page count'}
        </p>
      </div>
      <div className="stat-card">
        <h3>Earliest Publication Date</h3>
        <p className="stat-val">{oldestYear}</p>
      </div>
    </div>
  );
};

export default DashboardStats;
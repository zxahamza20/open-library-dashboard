import React from 'react';

const DashboardStats = ({ currentData, totalPool }) => {
  const visibleCount = currentData.length;

  // Metric Calculation 1: Extract Median/Mean Average Page Count
  const averagePages = visibleCount > 0 
    ? Math.round(currentData.reduce((acc, curr) => acc + curr.pages, 0) / visibleCount) 
    : 0;

  // Metric Calculation 2: Determine Earliest Dynamic Range Bound (Oldest Historical Work)
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
        <p className="stat-val">{averagePages} <span className="stat-unit">pages</span></p>
      </div>
      <div className="stat-card">
        <h3>Earliest Publication Date</h3>
        <p className="stat-val">{oldestYear}</p>
      </div>
    </div>
  );
};

export default DashboardStats;
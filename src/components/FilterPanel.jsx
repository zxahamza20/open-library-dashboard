import React from 'react';

const FilterPanel = ({
  searchQuery, setSearchQuery,
  selectedSubject, setSelectedSubject,
  selectedLanguage, setSelectedLanguage,
  minPages, setMinPages,
  maxPages, setMaxPages
}) => {
  return (
    <div className="filter-panel">
      {/* Search Filter */}
      <div className="filter-group text-search">
        <label htmlFor="search">Search Title:</label>
        <input 
          id="search"
          type="text" 
          placeholder="Filter by title context..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* NEW Feature: Subject Filter Dropdown */}
      <div className="filter-group category-select">
        <label htmlFor="subject">Subject / Genre:</label>
        <select 
          id="subject"
          value={selectedSubject} 
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="All">All Subjects</option>
          <option value="history">History</option>
          <option value="art">Art</option>
          <option value="fantasy">Fantasy</option>
          <option value="science">Science</option>
          <option value="fiction">Fiction</option>
          <option value="nonfiction">Non-Fiction</option>
        </select>
      </div>

      {/* Language Filter */}
      <div className="filter-group category-select">
        <label htmlFor="language">Language:</label>
        <select 
          id="language"
          value={selectedLanguage} 
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="All">All Languages</option>
          <option value="eng">English (eng)</option>
          <option value="fre">French (fre)</option>
          <option value="ger">German (ger)</option>
          <option value="spa">Spanish (spa)</option>
        </select>
      </div>

      {/* Page Bounds Filter */}
      <div className="filter-group bounds-input">
        <label>Page Length Scope:</label>
        <div className="bounds-row">
          <input 
            type="number" 
            placeholder="Min Pages"
            value={minPages}
            onChange={(e) => setMinPages(Number(e.target.value))}
          />
          <span>to</span>
          <input 
            type="number" 
            placeholder="Max Pages"
            value={maxPages}
            onChange={(e) => setMaxPages(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
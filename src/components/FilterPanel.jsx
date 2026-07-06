import React from 'react';

const FilterPanel = ({
  searchQuery, setSearchQuery,
  selectedLanguage, setSelectedLanguage,
  minPages, setMinPages,
  maxPages, setMaxPages
}) => {
  return (
    <div className="filter-panel">
      {/* Feature 1: Search text input */}
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

      {/* Feature 2: Dropdown categorization using alternate language property */}
      <div className="filter-group category-select">
        <label htmlFor="language">Language Classification:</label>
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

      {/* Feature 3: Explicit numeric constraints for bound values */}
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
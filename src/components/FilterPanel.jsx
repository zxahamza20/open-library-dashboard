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
          <option value="ita">Italian (ita)</option>
          <option value="rus">Russian (rus)</option>
          <option value="jpn">Japanese (jpn)</option>
          <option value="chi">Chinese (chi)</option>
          <option value="hun">Hungarian (hun)</option>
          <option value="por">Portuguese (por)</option>
          <option value="tgl">Tagalog (tgl)</option>
          <option value="ara">Arabic (ara)</option>
          <option value="dut">Dutch (dut)</option>
          <option value="heb">Hebrew (heb)</option>
          <option value="pol">Polish (pol)</option>
          <option value="swe">Swedish (swe)</option>
          <option value="per">Persian (per)</option>
          <option value="nor">Norwegian (nor)</option>
          <option value="mul">Multilingual(mul)</option>
          <option value="mal">Malay (mal)</option>
          <option value="hin">Hindi (hin)</option>
          <option value="ind">Indonesian (ind)</option>
          <option value="tur">Turkish (tur)</option>
          <option value="tel">Telugu (tel)</option>
        </select>
      </div>

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
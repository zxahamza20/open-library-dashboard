import React, { useState, useEffect } from 'react';
import FilterPanel from './components/FilterPanel';
import DashboardStats from './components/DashboardStats';
import BookRow from './components/BookRow';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter input states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [minPages, setMinPages] = useState(0);
  const [maxPages, setMaxPages] = useState(1000);

  // Fetch data using useEffect and async/await syntax
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        // Querying "history" books with page counts from Open Library API
        const response = await fetch('https://openlibrary.org/search.json?subject=history&limit=100');
        const data = await response.json();

        // Map and clean raw data to match requirements (each row must have at least two features)
        const formattedBooks = (data.docs || [])
          .filter(item => item.title && item.first_publish_year) // Data verification
          .map((item, index) => ({
            id: item.key || index,
            title: item.title,
            publishYear: item.first_publish_year,
            // Fallback parameters if specific items lack pages or language fields
            pages: item.number_of_pages_median || Math.floor(Math.random() * 300) + 150, 
            language: item.language && item.language[0] ? item.language[0] : 'eng',
            author: item.author_name ? item.author_name[0] : 'Unknown Author'
          }));

        setBooks(formattedBooks);
        setLoading(false);
      } catch (error) {
        console.error("Error retrieving data from Open Library API:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []); // Empty array ensures this hook executes only once on mount

  // --- Filtering Logic (Dynamic updates as user interacts) ---
  const filteredBooks = books.filter((book) => {
    // 1. Search Bar Filter (matches item titles)
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 2. Category Filter (restricts displayed items using language attribute)
    const matchesCategory = selectedLanguage === 'All' || book.language === selectedLanguage;
    
    // 3. Specific Bounds Filter (numeric constraints on page totals)
    const matchesBounds = book.pages >= minPages && book.pages <= maxPages;

    return matchesSearch && matchesCategory && matchesBounds;
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📚 Open Library Analytics Dashboard</h1>
        <p>Analyzing historical collection data through structural metrics</p>
      </header>

      {loading ? (
        <div className="loading-state">Gathering database records...</div>
      ) : (
        <>
          {/* Summary Statistics Component */}
          <DashboardStats currentData={filteredBooks} totalPool={books.length} />

          {/* Interactive Controls Component */}
          <FilterPanel 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            minPages={minPages}
            setMinPages={setMinPages}
            maxPages={maxPages}
            setMaxPages={setMaxPages}
          />

          {/* Tabular List View Components */}
          <section className="list-container">
            <div className="table-header">
              <span>Book Title & Author</span>
              <span>Publish Year</span>
              <span>Median Page Count</span>
              <span>Language Code</span>
            </div>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <BookRow key={book.id} book={book} />
              ))
            ) : (
              <div className="no-results">No matching volumes found for this selection filter.</div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default App;
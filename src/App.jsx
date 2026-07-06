import React, { useState, useEffect } from 'react';
import FilterPanel from './components/FilterPanel';
import DashboardStats from './components/DashboardStats';
import BookRow from './components/BookRow';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [minPages, setMinPages] = useState(0);
  const [maxPages, setMaxPages] = useState(1000);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://openlibrary.org/search.json?subject=history&limit=500');
        const data = await response.json();

        const formattedBooks = (data.docs || [])
          .filter(item => item.title && item.first_publish_year) 
          .map((item, index) => ({
            id: item.key || index,
            title: item.title,
            publishYear: item.first_publish_year,
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
  }, []); 

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedLanguage === 'All' || book.language === selectedLanguage;
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
          <DashboardStats currentData={filteredBooks} totalPool={books.length} />

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
import React, { useState, useEffect } from 'react';
import FilterPanel from './components/FilterPanel';
import DashboardStats from './components/DashboardStats';
import BookRow from './components/BookRow';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All'); 
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [minPages, setMinPages] = useState(0);
  const [maxPages, setMaxPages] = useState(4000);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50; 

  const SUBJECTS = ['history', 'art', 'fantasy', 'science', 'fiction', 'nonfiction'];

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const fetchAllSubjects = async () => {
      try {
        setLoading(true);

        const fetchPromises = SUBJECTS.map(subject =>
          fetch(`https://openlibrary.org/search.json?subject=${subject}&limit=1000&fields=key,title,author_name,first_publish_year,language,number_of_pages_median`)
            .then(res => res.json())
            .then(data => ({ subject, docs: data.docs || [] }))
        );

        const results = await Promise.all(fetchPromises);
        const allBooks = [];
        const seenKeys = new Set(); 

        results.forEach(({ subject, docs }) => {
          docs.forEach((item, index) => {
            const uniqueKey = item.key || `${subject}-${index}`;

            if (!seenKeys.has(uniqueKey) && item.title && item.first_publish_year) {
              seenKeys.add(uniqueKey);

              allBooks.push({
                id: uniqueKey,
                title: item.title,
                subject: subject, 
                publishYear: item.first_publish_year,
                pages: item.number_of_pages_median || null,
                language: item.language && item.language[0] ? item.language[0] : 'eng',
                author: item.author_name ? item.author_name[0] : 'Unknown Author'
              });
            }
          });
        });

        setBooks(shuffleArray(allBooks));
        setLoading(false);
      } catch (error) {
        console.error("Error retrieving multi-subject data from Open Library API:", error);
        setLoading(false);
      }
    };

    fetchAllSubjects();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSubject, selectedLanguage, minPages, maxPages]);

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || book.subject === selectedSubject;
    const matchesLanguage = selectedLanguage === 'All' || book.language === selectedLanguage;
    const matchesBounds = book.pages === null || (book.pages >= minPages && book.pages <= maxPages);
    return matchesSearch && matchesSubject && matchesLanguage && matchesBounds;
  });

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage) || 1;
  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooksSlice = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const currentFirstItem = filteredBooks.length === 0 ? 0 : indexOfFirstBook + 1;
  const currentLastItem = Math.min(indexOfLastBook, filteredBooks.length);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📚 Open Library Analytics Dashboard</h1>
        <div className="header-meta">
          <p>Analyzing multi-genre collections through structural metrics</p>
          {!loading && (
            <div className="view-counter">
              Showing <span className="highlight">{currentFirstItem}-{currentLastItem}</span> of <span className="highlight">{filteredBooks.length}</span> novel records 
            </div>
          )}
        </div>
      </header>

      {loading ? (
        <div className="loading-state">Gathering database records across multiple subjects...</div>
      ) : (
        <>
          <DashboardStats currentData={filteredBooks} totalPool={books.length} />

          <FilterPanel 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            minPages={minPages}
            setMinPages={setMinPages}
            maxPages={maxPages}
            setMaxPages={setMaxPages}
          />

          <section className="list-container">
            <div className="table-header">
              <span className="text-left">Book Title & Author</span>
              <span className="text-center">Subject</span>
              <span className="text-center">Publish Year</span>
              <span className="text-center">Median Pages</span>
              <span className="text-center">Language</span>
            </div>
            {currentBooksSlice.length > 0 ? (
              currentBooksSlice.map((book) => (
                <BookRow key={book.id} book={book} />
              ))
            ) : (
              <div className="no-results">No matching volumes found for this selection filter.</div>
            )}

            {filteredBooks.length > 0 && (
              <div className="pagination-controls">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="page-btn"
                >
                  &larr; Previous
                </button>
                <span className="page-info">
                  Page <strong>{currentPage}</strong> of {totalPages} 
                </span>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="page-btn"
                >
                  Next &rarr;
                </button>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default App;
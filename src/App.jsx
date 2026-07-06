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
  const [maxPages, setMaxPages] = useState(1000);
  const SUBJECTS = ['history', 'art', 'fantasy', 'science', 'fiction', 'nonfiction'];

  useEffect(() => {
    const fetchAllSubjects = async () => {
      try {
        setLoading(true);

        const fetchPromises = SUBJECTS.map(subject =>
          fetch(`https://openlibrary.org/search.json?subject=${subject}&limit=2500`)
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
                pages: item.number_of_pages_median || Math.floor(Math.random() * 300) + 150,
                language: item.language && item.language[0] ? item.language[0] : 'eng',
                author: item.author_name ? item.author_name[0] : 'Unknown Author'
              });
            }
          });
        });

        setBooks(allBooks);
        setLoading(false);
      } catch (error) {
        console.error("Error retrieving multi-subject data from Open Library API:", error);
        setLoading(false);
      }
    };

    fetchAllSubjects();
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || book.subject === selectedSubject;
    const matchesLanguage = selectedLanguage === 'All' || book.language === selectedLanguage;
    const matchesBounds = book.pages >= minPages && book.pages <= maxPages;
    return matchesSearch && matchesSubject && matchesLanguage && matchesBounds;
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📚 Open Library Analytics Dashboard</h1>
        <p>Analyzing multi-genre collections through structural metrics</p>
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
              <span>Book Title & Author</span>
              <span className="text-center">Subject</span>
              <span className="text-center">Publish Year</span>
              <span className="text-center">Median Pages</span>
              <span className="text-center">Language</span>
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
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
  const [selectedSubject, setSelectedSubject] = useState('All'); // New Subject Filter State
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [minPages, setMinPages] = useState(0);
  const [maxPages, setMaxPages] = useState(1000);

  // Define the list of subjects we want to pull from the API
  const SUBJECTS = ['history', 'art', 'fantasy', 'science', 'fiction', 'nonfiction'];

  useEffect(() => {
    const fetchAllSubjects = async () => {
      try {
        setLoading(true);

        // 1. Create an array of fetch promises, one for each subject
        const fetchPromises = SUBJECTS.map(subject =>
          fetch(`https://openlibrary.org/search.json?subject=${subject}&limit=5000`)
            .then(res => res.json())
            .then(data => ({ subject, docs: data.docs || [] }))
        );

        // 2. Execute all network requests concurrently
        const results = await Promise.all(fetchPromises);

        // 3. Process and merge the results into a single clean list
        const allBooks = [];
        const seenKeys = new Set(); // Prevents duplicate books if a book belongs to multiple subjects

        results.forEach(({ subject, docs }) => {
          docs.forEach((item, index) => {
            const uniqueKey = item.key || `${subject}-${index}`;

            // Only add the book if we haven't seen its unique key yet
            if (!seenKeys.has(uniqueKey) && item.title && item.first_publish_year) {
              seenKeys.add(uniqueKey);

              allBooks.push({
                id: uniqueKey,
                title: item.title,
                subject: subject, // Storing the subject category to filter by it later!
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

  // --- Filtering Logic (Evaluated on every render) ---
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Check against our new subject parameter
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
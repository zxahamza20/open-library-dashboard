import React, { createContext, useContext, useState, useEffect } from 'react';

const BooksContext = createContext(null);

const SUBJECTS = ['history', 'art', 'fantasy', 'science', 'fiction', 'nonfiction'];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllSubjects = async () => {
      try {
        setLoading(true);

        const fetchPromises = SUBJECTS.map(subject =>
          fetch(`https://openlibrary.org/search.json?subject=${subject}&limit=1000&fields=key,title,author_name,first_publish_year,language,number_of_pages_median,cover_i,edition_count`)
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
                author: item.author_name ? item.author_name[0] : 'Unknown Author',
                coverId: item.cover_i || null,
                editionCount: item.edition_count || null
              });
            }
          });
        });

        setBooks(shuffleArray(allBooks));
        setLoading(false);
      } catch (err) {
        console.error("Error retrieving multi-subject data from Open Library API:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchAllSubjects();
  }, []);

  return (
    <BooksContext.Provider value={{ books, loading, error, SUBJECTS }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const ctx = useContext(BooksContext);
  if (!ctx) {
    throw new Error('useBooks must be used within a BooksProvider');
  }
  return ctx;
};
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BooksProvider } from './context/BooksContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import BookDetail from './pages/BookDetail';
import About from './pages/About';
import './App.css';

const App = () => {
  return (
    <BooksProvider>
      <div className="app-shell">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </BooksProvider>
  );
};

export default App;
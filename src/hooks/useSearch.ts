// src/hooks/useSearch.ts
import { useState, useEffect } from 'react';
// import { collection, query, where, limit, getDocs } from 'firebase/firestore';
// import { db } from '../lib/firebase';
import type { Book } from '../types/book';
import { mockBooks } from '../data/mockBooks';

export const useSearch = (searchTerm: string, filters: {
  availableOnly: boolean;
  categories: string[];
  publishYear: number | null;
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchBooks = async () => {
      setLoading(true);
      try {
        // Mock search results - expanded dataset
        let filteredBooks = mockBooks;

        // Apply search term filter
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filteredBooks = filteredBooks.filter(book =>
            book.title.toLowerCase().includes(term) ||
            book.author.toLowerCase().includes(term) ||
            book.publisher.toLowerCase().includes(term) ||
            book.isbn.includes(term) ||
            book.categories.some(cat => cat.toLowerCase().includes(term)) ||
            book.keywords.some(kw => kw.toLowerCase().includes(term))
          );
        }

        // Apply filters
        if (filters.availableOnly) {
          filteredBooks = filteredBooks.filter(book => book.isAvailable);
        }

        if (filters.categories.length > 0) {
          filteredBooks = filteredBooks.filter(book =>
            filters.categories.some(cat => book.categories.includes(cat))
          );
        }

        if (filters.publishYear) {
          filteredBooks = filteredBooks.filter(book => book.publishYear === filters.publishYear);
        }

        setBooks(filteredBooks);
      } catch (error) {
        console.error('Search error:', error);
      }
      setLoading(false);
    };

    searchBooks();
  }, [searchTerm, filters]);

  return { books, loading };
};
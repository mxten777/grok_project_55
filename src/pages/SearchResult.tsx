// src/pages/SearchResult.tsx
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import FilterPanel from '../components/FilterPanel';
import { useSearch } from '../hooks/useSearch';

const SearchResult: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({ availableOnly: false, categories: [] as string[], publishYear: null as number | null });
  const searchTerm = useMemo(() => searchParams.get('q') || '', [searchParams]);
  const { books, loading } = useSearch(searchTerm, filters);

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-8">
          <SearchBar />
        </div>
        <div className="flex">
          <div className="w-1/4 pr-4">
            <FilterPanel filters={filters} onFilterChange={setFilters} />
          </div>
          <div className="w-3/4">
            <h2 className="text-2xl font-semibold mb-4">검색 결과: "{searchTerm}"</h2>
            {loading && <p>Loading...</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
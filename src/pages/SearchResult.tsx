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
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4">
            <FilterPanel filters={filters} onFilterChange={setFilters} />
          </div>
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                검색 결과: <span className="text-blue-600">"{searchTerm}"</span>
              </h2>
              <div className="text-sm text-gray-500">
                {books.length}권의 도서
              </div>
            </div>
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">검색 중...</span>
              </div>
            )}
            {!loading && books.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">검색 결과가 없습니다</h3>
                <p className="text-gray-600">다른 검색어로 시도해보세요</p>
              </div>
            )}
            {!loading && books.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
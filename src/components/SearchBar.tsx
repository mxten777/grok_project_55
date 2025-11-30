// src/components/SearchBar.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onSearch?: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [term, setTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock popular keywords
  const popularKeywords = [
    '김영하', '한강', '조남주', '정세랑', '이미예', '정지아', '김호연',
    '살인자의 기억법', '채식주의자', '82년생 김지영', '시선으로부터',
    '달러구트 꿈 백화점', '아버지의 해방일지', '불편한 편의점', '소년이 온다',
    '한국문학', '소설', '스릴러', 'SF', '판타지'
  ];

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const saveRecentSearch = (searchTerm: string) => {
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      saveRecentSearch(term.trim());
      if (onSearch) {
        onSearch(term.trim());
      } else {
        navigate(`/search?q=${encodeURIComponent(term.trim())}`);
      }
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setTerm(suggestion);
    setShowSuggestions(false);
    saveRecentSearch(suggestion);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  const filteredSuggestions = popularKeywords.filter(kw =>
    kw.toLowerCase().includes(term.toLowerCase()) && kw.toLowerCase() !== term.toLowerCase()
  ).slice(0, 5);

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex">
          <input
            ref={inputRef}
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="제목, 저자, 출판사, 키워드 검색..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            검색
          </button>
        </div>
      </form>

      {showSuggestions && (recentSearches.length > 0 || filteredSuggestions.length > 0) && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 mt-1">
          {recentSearches.length > 0 && (
            <div className="p-2 border-b border-gray-200">
              <div className="text-xs text-gray-500 mb-1">최근 검색어</div>
              {recentSearches.map((search, index) => (
                <div
                  key={index}
                  className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleSuggestionClick(search)}
                >
                  {search}
                </div>
              ))}
            </div>
          )}
          {filteredSuggestions.length > 0 && (
            <div className="p-2">
              <div className="text-xs text-gray-500 mb-1">추천 검색어</div>
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
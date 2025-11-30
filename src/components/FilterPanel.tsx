// src/components/FilterPanel.tsx
import React from 'react';

interface FilterPanelProps {
  filters: {
    availableOnly: boolean;
    categories: string[];
    publishYear: number | null;
  };
  onFilterChange: (filters: FilterPanelProps['filters']) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  const categories = [
    { name: '소설', icon: '📚' },
    { name: '한국문학', icon: '🇰🇷' },
    { name: '스릴러', icon: '🔪' },
    { name: 'SF', icon: '🚀' },
    { name: '판타지', icon: '🧙‍♂️' },
    { name: '페미니즘', icon: '♀️' },
    { name: '역사', icon: '📜' },
    { name: '일상', icon: '🏠' },
    { name: '가족', icon: '👨‍👩‍👧‍👦' }
  ];
  const years = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016];

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    onFilterChange({ ...filters, categories: newCategories });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sticky top-4">
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
          <span className="text-blue-600 text-sm">🔍</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900">필터</h3>
      </div>

      {/* 대출 가능 필터 */}
      <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <label className="flex items-center cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={filters.availableOnly}
              onChange={(e) => onFilterChange({ ...filters, availableOnly: e.target.checked })}
              className="sr-only"
            />
            <div className={`w-5 h-5 border-2 rounded-md mr-3 transition-colors ${
              filters.availableOnly
                ? 'bg-green-500 border-green-500'
                : 'border-gray-300 group-hover:border-green-400'
            }`}>
              {filters.availableOnly && (
                <svg className="w-3 h-3 text-white mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
          <div>
            <span className={`font-medium ${filters.availableOnly ? 'text-green-700' : 'text-gray-700'}`}>
              대출 가능 도서만
            </span>
            <p className="text-xs text-gray-500 mt-0.5">현재 빌릴 수 있는 책만 보기</p>
          </div>
        </label>
      </div>

      {/* 구분선 */}
      <div className="border-t border-gray-200 mb-6"></div>

      {/* 카테고리 필터 */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center mr-2">
            <span className="text-purple-600 text-xs">📂</span>
          </div>
          <h4 className="font-semibold text-gray-900">카테고리</h4>
          {filters.categories.length > 0 && (
            <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
              {filters.categories.length}
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 gap-2">
          {categories.map(({ name, icon }) => (
            <label key={name} className="flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group">
              <div className="relative mr-3">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(name)}
                  onChange={(e) => handleCategoryChange(name, e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 border-2 rounded transition-colors ${
                  filters.categories.includes(name)
                    ? 'bg-purple-500 border-purple-500'
                    : 'border-gray-300 group-hover:border-purple-400'
                }`}>
                  {filters.categories.includes(name) && (
                    <svg className="w-3 h-3 text-white mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm mr-2">{icon}</span>
              <span className={`text-sm font-medium ${filters.categories.includes(name) ? 'text-purple-700' : 'text-gray-700'}`}>
                {name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 구분선 */}
      <div className="border-t border-gray-200 mb-6"></div>

      {/* 출간연도 필터 */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 bg-orange-100 rounded-md flex items-center justify-center mr-2">
            <span className="text-orange-600 text-xs">📅</span>
          </div>
          <h4 className="font-semibold text-gray-900">출간연도</h4>
        </div>
        <div className="relative">
          <select
            value={filters.publishYear || ''}
            onChange={(e) => onFilterChange({ ...filters, publishYear: e.target.value ? parseInt(e.target.value) : null })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 appearance-none cursor-pointer"
          >
            <option value="">전체 연도</option>
            {years.map(year => (
              <option key={year} value={year}>{year}년</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* 필터 초기화 버튼 */}
      {(filters.availableOnly || filters.categories.length > 0 || filters.publishYear) && (
        <button
          onClick={() => onFilterChange({ availableOnly: false, categories: [], publishYear: null })}
          className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
        >
          필터 초기화
        </button>
      )}
    </div>
  );
};

export default FilterPanel;
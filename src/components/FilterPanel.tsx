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
  const categories = ['소설', '한국문학', '스릴러', 'SF', '판타지', '페미니즘', '역사', '일상', '가족'];
  const years = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016];

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    onFilterChange({ ...filters, categories: newCategories });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">필터</h3>

      <div className="mb-4">
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={filters.availableOnly}
            onChange={(e) => onFilterChange({ ...filters, availableOnly: e.target.checked })}
            className="mr-2"
          />
          대출 가능 도서만
        </label>
      </div>

      <div className="mb-4">
        <h4 className="font-medium mb-2">카테고리</h4>
        <div className="space-y-1">
          {categories.map(category => (
            <label key={category} className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={(e) => handleCategoryChange(category, e.target.checked)}
                className="mr-2"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium mb-2">출간연도</h4>
        <select
          value={filters.publishYear || ''}
          onChange={(e) => onFilterChange({ ...filters, publishYear: e.target.value ? parseInt(e.target.value) : null })}
          className="w-full p-2 border rounded"
        >
          <option value="">전체</option>
          {years.map(year => (
            <option key={year} value={year}>{year}년</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
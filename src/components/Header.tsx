// src/components/Header.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold hover:text-blue-200">
            도서관 OPAC
          </Link>
          <nav className="flex space-x-4">
            <Link
              to="/"
              className={`hover:text-blue-200 ${location.pathname === '/' ? 'font-semibold' : ''}`}
            >
              홈
            </Link>
            <Link
              to="/search"
              className={`hover:text-blue-200 ${location.pathname === '/search' ? 'font-semibold' : ''}`}
            >
              검색
            </Link>
            <Link
              to="/admin/books"
              className={`hover:text-blue-200 ${location.pathname.startsWith('/admin') ? 'font-semibold' : ''}`}
            >
              관리자
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
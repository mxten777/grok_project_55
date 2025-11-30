// src/pages/Home.tsx
import React from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';

const Home: React.FC = () => {
  // Mock popular books
  const popularBooks = [
    { id: '1', title: '살인자의 기억법', author: '김영하', coverImageUrl: 'https://picsum.photos/150/200?random=1', isAvailable: true },
    { id: '2', title: '채식주의자', author: '한강', coverImageUrl: 'https://picsum.photos/150/200?random=2', isAvailable: false },
    { id: '3', title: '82년생 김지영', author: '조남주', coverImageUrl: 'https://picsum.photos/150/200?random=3', isAvailable: true },
    { id: '4', title: '시선으로부터', author: '정세랑', coverImageUrl: 'https://picsum.photos/150/200?random=4', isAvailable: true },
    { id: '5', title: '달러구트 꿈 백화점', author: '이미예', coverImageUrl: 'https://picsum.photos/150/200?random=5', isAvailable: false },
  ];

  const newBooks = [
    { id: '6', title: '아버지의 해방일지', author: '정지아', coverImageUrl: 'https://picsum.photos/150/200?random=6', isAvailable: true },
    { id: '7', title: '불편한 편의점', author: '김호연', coverImageUrl: 'https://picsum.photos/150/200?random=7', isAvailable: true },
    { id: '8', title: '소년이 온다', author: '한강', coverImageUrl: 'https://picsum.photos/150/200?random=8', isAvailable: false },
  ];

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">도서관 OPAC 시스템</h1>
          <p className="text-gray-600 mt-2">도서를 검색하고 대출하세요</p>
        </div>
        <div className="flex justify-center mb-8">
          <SearchBar />
        </div>

        {/* Popular Books Slider */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">인기 도서</h2>
          <div className="overflow-x-auto">
            <motion.div
              className="flex space-x-4 pb-4"
              drag="x"
              dragConstraints={{ left: -200, right: 0 }}
            >
              {popularBooks.map((book) => (
                <motion.div
                  key={book.id}
                  className="flex-shrink-0 w-48"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BookCard book={book} onClick={() => console.log('Navigate to book')} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* New Books Slider */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">신착 도서</h2>
          <div className="overflow-x-auto">
            <motion.div
              className="flex space-x-4 pb-4"
              drag="x"
              dragConstraints={{ left: -200, right: 0 }}
            >
              {newBooks.map((book) => (
                <motion.div
                  key={book.id}
                  className="flex-shrink-0 w-48"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BookCard book={book} onClick={() => console.log('Navigate to book')} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
// src/pages/BookDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import QRShare from '../components/QRShare';
import { getMockBookById } from '../data/mockBooks';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const book = getMockBookById(id!);

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">도서를 찾을 수 없습니다</h1>
          <p className="text-gray-600">요청하신 도서가 존재하지 않습니다.</p>
        </div>
      </div>
    );
  }

  const currentUrl = window.location.href;

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row">
          <img src={book.coverImageUrl} alt={book.title} className="w-full md:w-48 h-64 object-cover rounded mr-0 md:mr-6 mb-4 md:mb-0" />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-2">저자: {book.author}</p>
            <p className="text-gray-500 mb-4">출판사: {book.publisher} ({book.publishYear})</p>
            <p className="mb-4">ISBN: {book.isbn}</p>
            <p className="mb-4">카테고리: {book.categories.join(', ')}</p>
            <p className="mb-4">키워드: {book.keywords.join(', ')}</p>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">소장 위치</h3>
              <p className="text-sm text-gray-600">
                {book.shelfLocation.floor}층 {book.shelfLocation.room} → {book.shelfLocation.section}구역 → {book.shelfLocation.row}번 선반 → {book.shelfLocation.column}번째 칸
              </p>
            </div>
            <span className={`inline-block px-4 py-2 text-lg rounded mb-4 ${book.isAvailable ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
              {book.isAvailable ? '대출 가능' : '대출 불가'}
            </span>
            <div className="mt-6">
              <QRShare url={currentUrl} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
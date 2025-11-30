// src/pages/Admin/BookList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../lib/firebase';
import { mockBooks } from '../../data/mockBooks';

interface Book {
  id: string;
  title: string;
  author: string;
  isAvailable: boolean;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const handleDelete = async (id: string) => {
    if (window.confirm('정말로 이 도서를 삭제하시겠습니까?')) {
      // Mock delete
      setBooks(books.filter((book: Book) => book.id !== id));
      alert('도서가 삭제되었습니다.');
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      // Mock data - using shared mockBooks
      const adminBooks: Book[] = mockBooks.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        isAvailable: book.isAvailable
      }));
      setBooks(adminBooks);
    };
    fetchBooks();
  }, []);

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <Link to="/" className="text-blue-500 hover:text-blue-700">← Back to Home</Link>
        </div>
        <h1 className="text-2xl font-bold mb-4">도서 목록</h1>
        <div className="mb-4">
          <Link to="/admin/book/edit/new" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">새 도서 추가</Link>
          <Link to="/admin/upload" className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">CSV 업로드</Link>
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">제목</th>
              <th className="px-4 py-2">저자</th>
              <th className="px-4 py-2">대출 가능</th>
              <th className="px-4 py-2">작업</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td className="px-4 py-2">{book.title}</td>
                <td className="px-4 py-2">{book.author}</td>
                <td className="px-4 py-2">{book.isAvailable ? '예' : '아니오'}</td>
                <td className="px-4 py-2">
                  <Link to={`/admin/book/edit/${book.id}`} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600">수정</Link>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onClick={() => handleDelete(book.id)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;
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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAvailable, setFilterAvailable] = useState<string>('all');

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

  // 필터링된 도서 목록
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAvailability = filterAvailable === 'all' ||
                               (filterAvailable === 'available' && book.isAvailable) ||
                               (filterAvailable === 'unavailable' && !book.isAvailable);
    return matchesSearch && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 섹션 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                홈으로 돌아가기
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-sm">👨‍💼</span>
              </div>
              <span className="text-sm font-medium text-gray-700">관리자 모드</span>
            </div>
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* 헤더 */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-blue-600 text-lg">📚</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">도서 관리</h1>
                  <p className="text-sm text-gray-600">도서 목록을 관리하고 편집하세요</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{filteredBooks.length}</div>
                  <div className="text-sm text-gray-500">총 도서</div>
                </div>
              </div>
            </div>
          </div>

          {/* 액션 바 */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              {/* 검색 및 필터 */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="제목 또는 저자로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                  />
                </div>
                <select
                  value={filterAvailable}
                  onChange={(e) => setFilterAvailable(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">전체 도서</option>
                  <option value="available">대출 가능</option>
                  <option value="unavailable">대출 불가</option>
                </select>
              </div>

              {/* 액션 버튼들 */}
              <div className="flex space-x-3">
                <Link
                  to="/admin/book/edit/new"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  새 도서 추가
                </Link>
                <Link
                  to="/admin/upload"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  CSV 업로드
                </Link>
              </div>
            </div>
          </div>

          {/* 테이블 */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    도서 정보
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    대출 상태
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-gray-600 text-sm">📖</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                            {book.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {book.author}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        book.isAvailable
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${
                          book.isAvailable ? 'bg-green-400' : 'bg-red-400'
                        }`}></span>
                        {book.isAvailable ? '대출 가능' : '대출 불가'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/admin/book/edit/${book.id}`}
                          className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          수정
                        </Link>
                        <button
                          onClick={() => handleDelete(book.id)}
                          className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-700 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 빈 상태 */}
          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm || filterAvailable !== 'all' ? '검색 결과가 없습니다' : '등록된 도서가 없습니다'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterAvailable !== 'all' ? '다른 검색어로 시도해보세요' : '새 도서를 추가해보세요'}
              </p>
              {(!searchTerm && filterAvailable === 'all') && (
                <Link
                  to="/admin/book/edit/new"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  첫 도서 추가하기
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookList;
// src/pages/Admin/BookEdit.tsx
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const BookEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const getInitialForm = () => {
    if (!isNew) {
      return {
        title: 'Sample Book',
        author: 'Author',
        publisher: 'Publisher',
        isbn: '1234567890',
        categories: 'Fiction',
        keywords: 'sample',
        publishYear: '2023',
        floor: '2',
        room: 'Reading Room',
        section: 'A',
        row: '3',
        column: '4',
        isAvailable: true
      };
    }
    return {
      title: '',
      author: '',
      publisher: '',
      isbn: '',
      categories: '',
      keywords: '',
      publishYear: '',
      floor: '',
      room: '',
      section: '',
      row: '',
      column: '',
      isAvailable: true
    };
  };

  const [form, setForm] = useState(getInitialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock save - in real app, save to Firebase
      console.log('Saving book:', form);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      alert(isNew ? '도서가 성공적으로 추가되었습니다!' : '도서가 성공적으로 수정되었습니다!');
      navigate('/admin/books');
    } catch (error) {
      console.error('Save error:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 섹션 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/admin/books"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                도서 목록으로 돌아가기
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
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-blue-600 text-lg">{isNew ? '➕' : '✏️'}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isNew ? '새 도서 추가' : '도서 정보 수정'}
                </h1>
                <p className="text-sm text-gray-600">
                  {isNew ? '새로운 도서를 등록하세요' : '도서 정보를 수정하세요'}
                </p>
              </div>
            </div>
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* 기본 정보 섹션 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center mr-2">
                  <span className="text-blue-600 text-xs">📖</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">기본 정보</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    제목 <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="도서 제목을 입력하세요"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    저자 <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="저자명을 입력하세요"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    출판사 <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="publisher"
                    value={form.publisher}
                    onChange={handleChange}
                    placeholder="출판사명을 입력하세요"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ISBN <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="isbn"
                    value={form.isbn}
                    onChange={handleChange}
                    placeholder="ISBN13을 입력하세요"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    출간연도
                  </label>
                  <input
                    name="publishYear"
                    value={form.publishYear}
                    onChange={handleChange}
                    placeholder="예: 2023"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* 분류 정보 섹션 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center mr-2">
                  <span className="text-purple-600 text-xs">🏷️</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">분류 정보</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    카테고리
                  </label>
                  <input
                    name="categories"
                    value={form.categories}
                    onChange={handleChange}
                    placeholder="예: 소설,스릴러,한국문학"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-1">쉼표(,)로 구분하여 입력하세요</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    키워드
                  </label>
                  <input
                    name="keywords"
                    value={form.keywords}
                    onChange={handleChange}
                    placeholder="예: 김영하,살인자의기억법,스릴러"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-1">쉼표(,)로 구분하여 입력하세요</p>
                </div>
              </div>
            </div>

            {/* 소장 위치 섹션 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-green-100 rounded-md flex items-center justify-center mr-2">
                  <span className="text-green-600 text-xs">📍</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">소장 위치</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">층</label>
                  <input
                    name="floor"
                    value={form.floor}
                    onChange={handleChange}
                    placeholder="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">실</label>
                  <input
                    name="room"
                    value={form.room}
                    onChange={handleChange}
                    placeholder="일반열람실"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">구역</label>
                  <input
                    name="section"
                    value={form.section}
                    onChange={handleChange}
                    placeholder="A"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">행</label>
                  <input
                    name="row"
                    value={form.row}
                    onChange={handleChange}
                    placeholder="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">칸</label>
                  <input
                    name="column"
                    value={form.column}
                    onChange={handleChange}
                    placeholder="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">대출 상태</label>
                  <div className="flex items-center">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="isAvailable"
                        checked={form.isAvailable}
                        onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 border-2 rounded-md mr-3 transition-colors cursor-pointer ${
                        form.isAvailable
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300'
                      }`}>
                        {form.isAvailable && (
                          <svg className="w-3 h-3 text-white mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <label htmlFor="isAvailable" className="text-sm font-medium text-gray-700 cursor-pointer">
                      대출 가능
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* 액션 버튼들 */}
            <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
              <Link
                to="/admin/books"
                className="px-6 py-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors text-center"
              >
                취소
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    저장 중...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {isNew ? '도서 추가' : '변경사항 저장'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookEdit;
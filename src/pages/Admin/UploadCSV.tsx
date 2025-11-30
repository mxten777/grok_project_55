// src/pages/Admin/UploadCSV.tsx
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Papa from 'papaparse';

interface BookData {
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  categories: string;
  keywords: string;
  publishYear: string;
  floor: string;
  room: string;
  section: string;
  row: string;
  column: string;
  isAvailable: string;
}

const UploadCSV: React.FC = () => {
  const [parsedData, setParsedData] = useState<BookData[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      alert('CSV 파일만 업로드 가능합니다.');
      return;
    }

    Papa.parse<BookData>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: Papa.ParseResult<BookData>) => {
        if (results.errors.length > 0) {
          console.error('CSV parsing errors:', results.errors);
          alert('CSV 파일 파싱 중 오류가 발생했습니다. 파일 형식을 확인해주세요.');
          return;
        }
        setParsedData(results.data);
      },
      error: (error: Error) => {
        console.error('CSV parsing error:', error);
        alert('CSV 파일 파싱 중 오류가 발생했습니다.');
      }
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!parsedData.length) {
      alert('업로드할 데이터가 없습니다.');
      return;
    }

    setUploading(true);
    try {
      // Mock upload - in real app, upload to Firebase
      console.log('Uploading books:', parsedData);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      alert(`${parsedData.length}권의 도서가 성공적으로 업로드되었습니다!`);
      setParsedData([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('업로드 중 오류가 발생했습니다.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelectClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
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
        <div className="space-y-6">
          {/* 헤더 카드 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <span className="text-purple-600 text-lg">📤</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">CSV 파일 업로드</h1>
                  <p className="text-sm text-gray-600">
                    도서 데이터를 CSV 파일로 일괄 업로드하세요
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CSV 형식 설명 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center mr-2">
                <span className="text-blue-600 text-xs">ℹ️</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">CSV 파일 형식 안내</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              CSV 파일은 다음 헤더를 포함해야 합니다. 모든 필드는 필수입니다.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="text-sm font-mono text-gray-800 mb-2">
                title,author,publisher,isbn,categories,keywords,publishYear,floor,room,section,row,column,isAvailable
              </div>
              <div className="text-sm font-mono text-gray-600">
                "살인자의 기억법","김영하","문학동네","9788954641630","소설,스릴러,한국문학","김영하,살인자의기억법,스릴러","2017","2","일반열람실","A","1","1","true"
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <strong>카테고리/키워드:</strong> 쉼표(,)로 구분하여 여러 개 입력 가능
              </div>
              <div>
                <strong>isAvailable:</strong> "true" 또는 "false" (대출 가능 여부)
              </div>
            </div>
          </div>

          {/* 파일 업로드 영역 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-6 h-6 bg-green-100 rounded-md flex items-center justify-center mr-2">
                <span className="text-green-600 text-xs">📁</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">파일 선택</h2>
            </div>

            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragActive
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-900 mb-2">
                  CSV 파일을 드래그하거나 클릭하여 선택하세요
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  파일 크기는 10MB 이하로 제한됩니다
                </p>
                <button
                  onClick={handleFileSelectClick}
                  className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  파일 선택
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* 업로드 버튼 */}
            {parsedData.length > 0 && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="px-8 py-3 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  {uploading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      업로드 중...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {parsedData.length}권 업로드
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* 데이터 미리보기 */}
          {parsedData.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 text-sm">👁️</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">데이터 미리보기</h2>
                      <p className="text-sm text-gray-600">
                        총 {parsedData.length}건의 데이터가 파싱되었습니다
                      </p>
                    </div>
                  </div>
                  {parsedData.length > 10 && (
                    <span className="text-sm text-gray-500">
                      처음 10건만 표시
                    </span>
                  )}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">저자</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">출판사</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {parsedData.slice(0, 10).map((book, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {book.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {book.author}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {book.publisher}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                          {book.isbn}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {book.categories}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            book.isAvailable === 'true'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {book.isAvailable === 'true' ? '대출가능' : '대출불가'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {parsedData.length > 10 && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-500">
                    ... 그리고 {parsedData.length - 10}건 더
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadCSV;
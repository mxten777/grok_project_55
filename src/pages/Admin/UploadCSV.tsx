// src/pages/Admin/UploadCSV.tsx
import React, { useState } from 'react';
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // setFile(selectedFile);

      // Parse CSV
      Papa.parse<BookData>(selectedFile, {
        header: true,
        skipEmptyLines: true,
        complete: (results: Papa.ParseResult<BookData>) => {
          setParsedData(results.data);
        },
        error: (error: Error) => {
          console.error('CSV parsing error:', error);
          alert('CSV 파일 파싱 중 오류가 발생했습니다.');
        }
      });
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
      alert(`${parsedData.length}권의 도서가 성공적으로 업로드되었습니다!`);
      // setFile(null);
      setParsedData([]);
    } catch (error) {
      console.error('Upload error:', error);
      alert('업로드 중 오류가 발생했습니다.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <Link to="/admin/books" className="text-blue-500 hover:text-blue-700">← Back to Book List</Link>
        </div>
        <h1 className="text-2xl font-bold mb-4">CSV 업로드</h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">CSV 파일 형식</h2>
          <p className="text-sm text-gray-600 mb-2">
            CSV 파일은 다음 헤더를 포함해야 합니다: title, author, publisher, isbn, categories, keywords, publishYear, floor, room, section, row, column, isAvailable
          </p>
          <div className="bg-gray-100 p-3 rounded text-sm font-mono">
            title,author,publisher,isbn,categories,keywords,publishYear,floor,room,section,row,column,isAvailable<br />
            "살인자의 기억법","김영하","문학동네","9788954641630","소설,스릴러,한국문학","김영하,살인자의기억법,스릴러","2017","2","일반열람실","A","1","1","true"
          </div>
        </div>

        <div className="mb-6">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="mb-4"
          />
          <button
            onClick={handleUpload}
            disabled={!parsedData.length || uploading}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {uploading ? '업로드 중...' : '업로드'}
          </button>
        </div>

        {parsedData.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">미리보기 ({parsedData.length}건)</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-2 py-1">제목</th>
                    <th className="border border-gray-300 px-2 py-1">저자</th>
                    <th className="border border-gray-300 px-2 py-1">출판사</th>
                    <th className="border border-gray-300 px-2 py-1">ISBN</th>
                    <th className="border border-gray-300 px-2 py-1">카테고리</th>
                    <th className="border border-gray-300 px-2 py-1">대출가능</th>
                  </tr>
                </thead>
                <tbody>
                  {parsedData.slice(0, 5).map((book, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-2 py-1">{book.title}</td>
                      <td className="border border-gray-300 px-2 py-1">{book.author}</td>
                      <td className="border border-gray-300 px-2 py-1">{book.publisher}</td>
                      <td className="border border-gray-300 px-2 py-1">{book.isbn}</td>
                      <td className="border border-gray-300 px-2 py-1">{book.categories}</td>
                      <td className="border border-gray-300 px-2 py-1">{book.isAvailable}</td>
                    </tr>
                  ))}
                  {parsedData.length > 5 && (
                    <tr>
                      <td colSpan={6} className="border border-gray-300 px-2 py-1 text-center text-gray-500">
                        ... 그리고 {parsedData.length - 5}건 더
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadCSV;
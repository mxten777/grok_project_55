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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save - in real app, save to Firebase
    console.log('Saving book:', form);
    alert(isNew ? 'Book added successfully!' : 'Book updated successfully!');
    navigate('/admin/books');
  };

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <Link to="/admin/books" className="text-blue-500 hover:text-blue-700">← Back to Book List</Link>
        </div>
        <h1 className="text-2xl font-bold mb-4">{isNew ? '새 도서 추가' : '도서 수정'}</h1>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">제목</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="도서 제목" className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">저자</label>
              <input name="author" value={form.author} onChange={handleChange} placeholder="저자" className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">출판사</label>
              <input name="publisher" value={form.publisher} onChange={handleChange} placeholder="출판사" className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ISBN</label>
              <input name="isbn" value={form.isbn} onChange={handleChange} placeholder="ISBN13" className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">카테고리</label>
              <input name="categories" value={form.categories} onChange={handleChange} placeholder="쉼표로 구분" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">키워드</label>
              <input name="keywords" value={form.keywords} onChange={handleChange} placeholder="쉼표로 구분" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">출간연도</label>
              <input name="publishYear" value={form.publishYear} onChange={handleChange} placeholder="2023" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">층</label>
              <input name="floor" value={form.floor} onChange={handleChange} placeholder="층" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">실</label>
              <input name="room" value={form.room} onChange={handleChange} placeholder="실" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">구역</label>
              <input name="section" value={form.section} onChange={handleChange} placeholder="구역" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">행</label>
              <input name="row" value={form.row} onChange={handleChange} placeholder="행" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">칸</label>
              <input name="column" value={form.column} onChange={handleChange} placeholder="칸" className="w-full p-2 border rounded" />
            </div>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="isAvailable" checked={form.isAvailable} onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })} className="mr-2" />
            <label htmlFor="isAvailable" className="text-sm font-medium">대출 가능</label>
          </div>
          <div className="flex space-x-4">
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">저장</button>
            <Link to="/admin/books" className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">취소</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookEdit;
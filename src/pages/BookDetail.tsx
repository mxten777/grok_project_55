// src/pages/BookDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import QRShare from '../components/QRShare';

interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  categories: string[];
  keywords: string[];
  publishYear: number;
  shelfLocation: {
    floor: string;
    room: string;
    section: string;
    row: string;
    column: string;
  };
  coverImageUrl: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Mock book data - same as in useSearch
const getMockBooks = (): Book[] => [
  {
    id: '1',
    title: '살인자의 기억법',
    author: '김영하',
    publisher: '문학동네',
    isbn: '9788954641630',
    categories: ['소설', '스릴러', '한국문학'],
    keywords: ['김영하', '살인자의기억법', '스릴러', '한국문학', '범죄소설', '베스트셀러'],
    publishYear: 2017,
    shelfLocation: { floor: '2', room: '일반열람실', section: 'A', row: '1', column: '1' },
    coverImageUrl: 'https://picsum.photos/150/200?random=1',
    isAvailable: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01')
  },
  {
    id: '2',
    title: '채식주의자',
    author: '한강',
    publisher: '창비',
    isbn: '9788936433598',
    categories: ['소설', '한국문학'],
    keywords: ['한강', '채식주의자', '한국문학', '노벨문학상', '현대소설'],
    publishYear: 2007,
    shelfLocation: { floor: '2', room: '일반열람실', section: 'A', row: '2', column: '2' },
    coverImageUrl: 'https://picsum.photos/150/200?random=2',
    isAvailable: false,
    createdAt: new Date('2023-01-02'),
    updatedAt: new Date('2023-01-02')
  },
  {
    id: '3',
    title: '82년생 김지영',
    author: '조남주',
    publisher: '민음사',
    isbn: '9788937473135',
    categories: ['소설', '한국문학', '페미니즘'],
    keywords: ['조남주', '82년생김지영', '한국문학', '페미니즘', '사회문제'],
    publishYear: 2016,
    shelfLocation: { floor: '2', room: '일반열람실', section: 'B', row: '1', column: '1' },
    coverImageUrl: 'https://picsum.photos/150/200?random=3',
    isAvailable: true,
    createdAt: new Date('2023-01-03'),
    updatedAt: new Date('2023-01-03')
  },
  {
    id: '4',
    title: '시선으로부터',
    author: '정세랑',
    publisher: '문학동네',
    isbn: '9788954655972',
    categories: ['소설', '한국문학', 'SF'],
    keywords: ['정세랑', '시선으로부터', '한국문학', 'SF', '디스토피아'],
    publishYear: 2020,
    shelfLocation: { floor: '3', room: '특별열람실', section: 'C', row: '1', column: '1' },
    coverImageUrl: 'https://picsum.photos/150/200?random=4',
    isAvailable: true,
    createdAt: new Date('2023-01-04'),
    updatedAt: new Date('2023-01-04')
  },
  {
    id: '5',
    title: '달러구트 꿈 백화점',
    author: '이미예',
    publisher: '팩토리나인',
    isbn: '9791165341909',
    categories: ['소설', '판타지', '한국문학'],
    keywords: ['이미예', '달러구트꿈백화점', '판타지', '한국문학', '꿈', '베스트셀러'],
    publishYear: 2020,
    shelfLocation: { floor: '2', room: '일반열람실', section: 'A', row: '3', column: '3' },
    coverImageUrl: 'https://picsum.photos/150/200?random=5',
    isAvailable: false,
    createdAt: new Date('2023-01-05'),
    updatedAt: new Date('2023-01-05')
  },
  {
    id: '6',
    title: '아버지의 해방일지',
    author: '정지아',
    publisher: '창비',
    isbn: '9788936434755',
    categories: ['소설', '한국문학', '가족'],
    keywords: ['정지아', '아버지의해방일지', '한국문학', '가족', '베스트셀러'],
    publishYear: 2022,
    shelfLocation: { floor: '2', room: '일반열람실', section: 'B', row: '2', column: '2' },
    coverImageUrl: 'https://picsum.photos/150/200?random=6',
    isAvailable: true,
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2023-06-01')
  },
  {
    id: '7',
    title: '불편한 편의점',
    author: '김호연',
    publisher: '나무옆의자',
    isbn: '9791161571188',
    categories: ['소설', '한국문학', '일상'],
    keywords: ['김호연', '불편한편의점', '한국문학', '일상', '베스트셀러'],
    publishYear: 2021,
    shelfLocation: { floor: '2', room: '일반열람실', section: 'A', row: '4', column: '4' },
    coverImageUrl: 'https://picsum.photos/150/200?random=7',
    isAvailable: true,
    createdAt: new Date('2023-04-01'),
    updatedAt: new Date('2023-04-01')
  },
  {
    id: '8',
    title: '소년이 온다',
    author: '한강',
    publisher: '창비',
    isbn: '9788936434120',
    categories: ['소설', '한국문학', '역사'],
    keywords: ['한강', '소년이온다', '한국문학', '역사', '노벨문학상'],
    publishYear: 2014,
    shelfLocation: { floor: '3', room: '특별열람실', section: 'D', row: '1', column: '1' },
    coverImageUrl: 'https://picsum.photos/150/200?random=8',
    isAvailable: false,
    createdAt: new Date('2023-01-06'),
    updatedAt: new Date('2023-01-06')
  }
];

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const book = getMockBooks().find(b => b.id === id);

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
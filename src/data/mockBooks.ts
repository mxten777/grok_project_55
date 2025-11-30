// src/data/mockBooks.ts
import type { Book } from '../types/book';

export const mockBooks: Book[] = [
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

export const getMockBookById = (id: string): Book | undefined => {
  return mockBooks.find(book => book.id === id);
};
// src/types/book.ts
export interface Book {
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

export interface SearchFilters {
  availableOnly: boolean;
  categories: string[];
  publishYear: number | null;
}

export interface SearchLog {
  keyword: string;
  userId?: string;
  timestamp: Date;
  resultCount?: number;
}
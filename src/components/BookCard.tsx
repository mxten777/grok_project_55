// src/components/BookCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Book {
  id: string;
  title: string;
  author: string;
  coverImageUrl: string;
  isAvailable: boolean;
}

interface BookCardProps {
  book: Book;
  onClick?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/book/${book.id}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow" onClick={handleClick}>
      <img src={book.coverImageUrl} alt={book.title} className="w-full h-48 object-cover rounded" />
      <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
      <p className="text-gray-600">{book.author}</p>
      <span className={`inline-block mt-2 px-2 py-1 text-sm rounded ${book.isAvailable ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
        {book.isAvailable ? 'Available' : 'Unavailable'}
      </span>
    </div>
  );
};

export default BookCard;
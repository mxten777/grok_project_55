// src/components/QRShare.tsx
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRShareProps {
  url: string;
}

const QRShare: React.FC<QRShareProps> = ({ url }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Book Details',
          url: url,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      alert('URL copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <QRCodeSVG value={url} size={128} />
      <button
        onClick={handleShare}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Share Book
      </button>
    </div>
  );
};

export default QRShare;
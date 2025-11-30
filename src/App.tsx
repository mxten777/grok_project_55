import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import BookDetail from './pages/BookDetail';
import BookList from './pages/Admin/BookList';
import BookEdit from './pages/Admin/BookEdit';
import UploadCSV from './pages/Admin/UploadCSV';

function App() {
  return (
    <Router future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/admin/books" element={<BookList />} />
          <Route path="/admin/book/edit/:id" element={<BookEdit />} />
          <Route path="/admin/upload" element={<UploadCSV />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

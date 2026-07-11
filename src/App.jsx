// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import PropertyPage from './components/PropertyPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/properties/:id" element={<PropertyPage />} />
    </Routes>
  );
}

export default App;
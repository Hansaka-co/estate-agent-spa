// src/App.jsx
import './App.css';
import 'react-widgets/styles.css'; // gives the widgets their styling
import SearchForm from './components/SearchForm';

function App() {
  return (
    <div className="app">
      <h1>Find your property</h1>
      <SearchForm />
    </div>
  );
}

export default App;
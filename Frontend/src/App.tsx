import { Routes, Route } from 'react-router-dom';
import FavouritesPage from './views/FavouritesPage';
import HomePage from './views/HomePage';
import '../src/styles/global.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<HomePage />} />
      <Route path="/favourites" element={<FavouritesPage />} />
    </Routes>
  );
}

export default App;

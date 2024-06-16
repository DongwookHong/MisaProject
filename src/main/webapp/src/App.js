/* eslint-disable */

import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Blog from './BlogPage/BlogPage';
import SearchMenu from './SearchMenu/SearchMenu.js';
import Park from './ParkPage/ParkPage.js';
import QrPage from './MapGuide/QrPage.js';
import SearchShop from './SearchShop/SearchShop.js';
import FloorMenu from './FloorMenu/FloorMenu.js';
import Main from './MainMenu/Main.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<QrPage />} />
          <Route path="/main" element={<Main />} />
          <Route path="/store0" element={<Blog />} />
          <Route path="/menu" element={<SearchMenu />} />
          <Route path="/parkinfo" element={<Park />} />
          <Route path="/qrpage" element={<QrPage />} />
          <Route path="/searchshop" element={<SearchShop />} />
          <Route path="/floor0" element={<FloorMenu />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

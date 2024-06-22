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
          <Route path="/store0" element={<Blog />} /> // 상점의 모든 정보 + 상점 사진
          <Route path="/menu" element={<SearchMenu />} /> //건물, 층, 상점 이름, 상점 사진
          <Route path="/parkinfo" element={<Park />} /> //필요 없음
          <Route path="/qrpage" element={<QrPage />} /> // 건물, 층, 블럭 이름, 상점 이름 (추후 작업)
          <Route path="/searchshop" element={<SearchShop />} /> // 상점 이름, 상점 위치, 블럭, 층 이미지
          <Route path="/floor0" element={<FloorMenu />} /> //건물, 층, 상점 이름
        </Routes>
      </Router>
    </div>
  );
}

export default App;

/* eslint-disable */

import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Blog from './BlogPage/BlogPage';
import SearchMenu from './SearchMenu/SearchMenu.js';
import Park from './ParkPage/ParkPage.js';
import QrPage from './MapGuide/QrPage.js';
import FindSpot from './FindSpot/FindSpot.js';
import FloorMenu from './FloorMenu/FloorMenu.js';
import MainComponent from './FloorSpecific/MainComponent.js';
import Main from './MainMenu/Main.js';
import BlogPage from './BlogPage/Blog';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<QrPage />} />
          <Route path="/main" element={<Main />} />
<<<<<<< HEAD
          <Route path="/store0" element={<Blog />} />// 상점의 모든 정보 + 상점 사진
          <Route path="/menu" element={<SearchMenu />} /> //건물, 층, 상점 이름, 상점 사진
=======
          <Route path="/store0" element={<Blog />} />
          <Route path="/storeinfo/:id" element={<BlogPage />} />

          <Route path="/menu" element={<SearchMenu />} />
>>>>>>> origin
          <Route path="/parkinfo" element={<Park />} />
          <Route path="/floorspecific" element={<MainComponent />} />
          <Route path="/qrpage" element={<QrPage />} />
          <Route path="/findspot" element={<FindSpot />} />// 상점 이름, 상점 위치, 블럭, 층 이미지
          <Route path="/floor0" element={<FloorMenu />} />//건물, 층, 상점 이름
          {/* <Route path="/store/:id" element={<StoreDetail />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

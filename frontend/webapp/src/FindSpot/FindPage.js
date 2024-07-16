import React from 'react';
import { Link } from 'react-router-dom';
import Blog from '../asset/logo/blog_transparent.png';

const FindPage = ({ svgContainerRef, canvasRef, currentStore }) => {
  return (
    <div>
      <div className="findspot-container">
        <p>
          현재 계신곳은{' '}
          <span className="current-loc">{'  '} 힐스테이트 A동 1층</span>
          입니다.
        </p>
        {currentStore && (
          <p>
            <span className="find-name">{currentStore.store_name} </span> 는{' '}
            <span className="find-loc">
              힐스테이트 {currentStore.floor_string_specific}{' '}
              {currentStore.floor_number}층
            </span>
            에 있습니다.
          </p>
        )}
      </div>

      <div
        className="ImageContainer"
        style={{ width: '100%', height: 'auto', position: 'relative' }}>
        <div ref={svgContainerRef} style={{ display: 'none' }}></div>
        <canvas
          ref={canvasRef}
          className="HomepageIcon"
          style={{ width: '100%', height: 'auto' }}></canvas>
      </div>
      {currentStore && (
        <div className="BlogLink">
          <Link to={`/storeinfo/${currentStore.id}`} className="HomepageLink">
            <img src={Blog} alt="Blog" className="HomepageIcon" />
            <span className="BlogText">
              <span className="find-name">{currentStore.store_name}</span>{' '}
              바로가기
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FindPage;

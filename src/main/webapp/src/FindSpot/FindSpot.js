import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import '../style/FindSpot/FindSpot.css';
import MainHeader from '../Fix/MainHeader.js';
import MainFooter from '../Fix/MainFooter.js';
import Banner from '../Fix/MenuOpen.js';
import Ad from '../Fix/Advertise.js';
import Blog from '../asset/logo/blog_transparent.png';
import { drawLocpin } from '../utils/cordi.js';
import jsonData from '../test.json';
import CurToDest from './CurToDest.js';

function FindSpot() {
  const canvasRef = useRef(null);
  const svgContainerRef = useRef(null);
  const { id } = useParams(); // URL 파라미터에서 상점 ID를 가져옴
  const [store, setStore] = useState(null);

  useEffect(() => {
    const storeData = jsonData.find((item) => item.id.toString() === id);
    setStore(storeData);
  }, [id]);

  useEffect(() => {
    const svgPath = `${process.env.PUBLIC_URL}/mapcollect/B.svg`;
    fetch(svgPath)
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(data, 'image/svg+xml');
        const svgElement = svgDoc.documentElement;

        // Append the SVG to a hidden container so it can be processed
        svgContainerRef.current.appendChild(svgElement);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set canvas size to match SVG size
        const svgWidth = parseInt(svgElement.getAttribute('width')) || 400; // Default width
        const svgHeight = parseInt(svgElement.getAttribute('height')) || 400; // Default height
        canvas.width = svgWidth;
        canvas.height = svgHeight;

        console.log(
          `Canvas size set to width: ${svgWidth}, height: ${svgHeight}`
        );

        const svgString = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgString], {
          type: 'image/svg+xml;charset=utf-8',
        });
        const url = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, svgWidth, svgHeight);
          URL.revokeObjectURL(url);

          console.log('Image loaded and drawn on canvas');

          // Use drawLocpin function from cordi.js
          drawLocpin(svgElement, ctx);
        };

        img.onerror = () => {
          console.error('Failed to load the image.');
        };

        img.src = url;
      })
      .catch((error) => {
        console.error('Error fetching or parsing the SVG file:', error);
      });
  }, []);
  if (!store) {
    return <div>잘못된 페이지 접근입니다.</div>; // 데이터가 로드되지 않은 경우 로딩 메시지 표시
  }

  return (
    <div>
      <MainHeader />
      {/* <Banner /> */}
      <Ad />
      <div className="curtodest-wrapper">
        {store && <CurToDest currentStore={store} />}
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
      <div className="BlogLink">
        <Link to={`/storeinfo/${store.id}`} className="HomepageLink">
          <img src={Blog} alt="Blog" className="HomepageIcon" />
          <span className="BlogText">
            <span className="find-name">{store.store_name}</span> 바로가기
          </span>
        </Link>
      </div>
      <MainFooter />
    </div>
  );
}

export default FindSpot;

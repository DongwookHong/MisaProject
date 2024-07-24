import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../style/FindSpot/FindSpot.css';
import MainHeader from '../Fix/MainHeader.js';
import MainFooter from '../Fix/MainFooter.js';
import Banner from '../Fix/MenuOpen.js';
import Ad from '../Fix/Advertise.js';
import Blog from '../asset/logo/blog_transparent.png';
import { drawLocpin } from '../utils/drawLocpin.js';

import CurToDest from './CurToDest.js';

const API_KEY = process.env.REACT_APP_API_KEY;

function FindSpot() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const svgDocRef = useRef(null);
  const imgRef = useRef(null);
  const { name } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const currentLocation = location.state?.currentLocation;

  const [store, setStore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scale, setScale] = useState(1);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleResize = useCallback(() => {
    if (containerRef.current && imgRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const imgWidth = imgRef.current.width;
      const newScale = containerWidth / imgWidth;
      setScale(newScale);
    }
  }, []);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await axios.get(
          // `https://api.misarodeo.com//api/find-spot/${encodeURIComponent(
          `/api/find-spot/${encodeURIComponent(name)}`,
          {
            headers: {
              accept: '*/*',
              'x-api-key': API_KEY,
            },
          }
        );

        if (response.status === 204 || !response.data) {
          navigate('/404', { replace: true });
          return;
        }

        const storeData = response.data;
        setStore(storeData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching or parsing store data:', error);
        if (error.response && error.response.status === 404) {
          navigate('/404', { replace: true });
        } else {
          setError('상점 데이터를 불러오거나 처리하는 데 실패했습니다.');
          setIsLoading(false);
        }
      }
    };

    fetchStoreData();
  }, [name, navigate]);

  useEffect(() => {
    if (store) {
      const svgPath = `${store.floorImage}`;
      fetch(svgPath)
        .then((response) => response.text())
        .then((svgText) => {
          const parser = new DOMParser();
          const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
          svgDocRef.current = svgDoc;

          const svgElement = svgDoc.documentElement;
          if (!svgElement) {
            throw new Error('SVG element not found in the document');
          }

          const width = parseFloat(
            svgElement.getAttribute('width') || svgElement.viewBox.baseVal.width
          );
          const height = parseFloat(
            svgElement.getAttribute('height') ||
              svgElement.viewBox.baseVal.height
          );

          const img = new Image();
          img.src =
            'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgText);
          imgRef.current = img;

          img.onload = () => {
            handleResize();
            window.addEventListener('resize', handleResize);

            const drawCanvas = () => {
              const canvas = canvasRef.current;
              const ctx = canvas.getContext('2d');

              const dpr = window.devicePixelRatio || 1;
              const scaledWidth = width * scale;
              const scaledHeight = height * scale;

              canvas.style.width = `${scaledWidth}px`;
              canvas.style.height = `${scaledHeight}px`;
              canvas.width = scaledWidth * dpr;
              canvas.height = scaledHeight * dpr;

              ctx.scale(dpr * scale, dpr * scale);

              ctx.clearRect(0, 0, canvas.width, canvas.height);

              ctx.imageSmoothingEnabled = true;
              ctx.imageSmoothingQuality = 'high';

              ctx.drawImage(img, 0, 0, width, height);

              // 가게 위치만 그리기
              drawLocpin(
                svgElement,
                ctx,
                store,
                { data: [store] },
                false,
                scale
              );
            };

            drawCanvas();
          };

          img.onerror = (error) => {
            console.error('Failed to load the SVG image:', error);
          };
        })
        .catch((error) => {
          console.error('Error fetching or parsing the SVG file:', error);
        });

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [store, scale, handleResize]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!store) return null;

  return (
    <div>
      <MainHeader handleMenuClick={handleMenuClick} />
      <Banner menuOpen={menuOpen} closeMenu={closeMenu} />
      <Ad />
      <div className="curtodest-wrapper">
        <CurToDest currentStore={store} currentLocation={currentLocation} />
      </div>
      <div
        ref={containerRef}
        className="ImageContainer"
        style={{ width: '100%', height: 'auto', position: 'relative' }}>
        <canvas
          ref={canvasRef}
          className="HomepageIcon"
          style={{ width: '100%', height: 'auto' }}></canvas>
      </div>
      <div className="BlogLink">
        <Link to={`/storeinfo/${store.storeName}`} className="HomepageLink">
          <img src={Blog} alt="Blog" className="HomepageIcon" />
          <span className="BlogText">
            <span className="find-name">{store.storeName}</span>
            <br />
            바로가기
          </span>
        </Link>
      </div>
      <MainFooter />
    </div>
  );
}

export default FindSpot;

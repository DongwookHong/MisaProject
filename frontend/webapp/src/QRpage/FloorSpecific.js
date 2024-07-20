import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { drawLocpin } from '../utils/drawLocpin';

function FloorSpecific({ canvasRef, selectedFacility, selectedStore, selectedFloorData, currentLocation }) {
  const svgDocRef = useRef(null);
  const imgRef = useRef(null);

  useLayoutEffect(() => {
    if (!selectedFloorData) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const loadSvgAndDraw = async () => {
      try {
        // ... (기존 코드 유지)
        const imageUrl = `${selectedFloorData.floorImage}`;
        console.log("Attempting to fetch from URL:", imageUrl);

        const response = await fetch(imageUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const svgText = await response.text();

        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        svgDocRef.current = svgDoc;

        const svgElement = svgDoc.querySelector('svg');
        if (!svgElement) {
          throw new Error('SVG element not found in the document');
        }
        const width = svgElement.getAttribute('width');
        const height = svgElement.getAttribute('height');

        const img = new Image();
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgText);
        imgRef.current = img;

        img.onload = () => {
          canvas.width = width;
          canvas.height = height;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          if (currentLocation) {
            drawLocpin(svgDoc, ctx, currentLocation, selectedFloorData, true);
          }
          if (selectedFacility) {
            drawSelectedFacility(ctx, svgDoc, selectedFacility, selectedFloorData);
          }
          if (selectedStore) {
            drawSelectedStore(ctx, svgDoc, selectedStore, selectedFloorData);
          }
        };
        img.onerror = (error) => {
          console.error('Failed to load the SVG image:', error);
        };

        // ... (기존 코드 유지)
      } catch (error) {
        console.error('Error fetching or parsing the SVG file:', error.message);
      }
    };

    loadSvgAndDraw();
  }, [selectedFloorData, canvasRef, currentLocation, selectedFacility, selectedStore]);

  const drawSelectedFacility = (ctx, svgDoc, selectedFacility, floorData) => {
    const facilities = floorData.data.filter(item => item.type === 'facility' && item.name === selectedFacility);
    facilities.forEach(facility => {
      drawLocpin(svgDoc, ctx, facility, floorData, false);
    });
  };

  const drawSelectedStore = (ctx, svgDoc, selectedStore, floorData) => {
    const store = floorData.data.find(item => item.type === 'store' && item.name === selectedStore);
    if (store) {
      drawLocpin(svgDoc, ctx, store, floorData, false);
    }
  };

  return (
    <div className="MapImage-qr">
      <canvas ref={canvasRef} className="responsive-canvas"></canvas>
    </div>
  );
}

export default FloorSpecific;
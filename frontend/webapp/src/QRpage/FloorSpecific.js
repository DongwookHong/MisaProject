import React, { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { drawLocpin } from '../utils/drawLocpin';

function FloorSpecific({ canvasRef, selectedFacility, selectedStore, selectedFloorData, currentLocation }) {
  const svgDocRef = useRef(null);
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  const handleResize = () => {
    if (containerRef.current && imgRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const imgWidth = imgRef.current.width;
      const newScale = containerWidth / imgWidth;
      setScale(newScale);
    }
  };

  useLayoutEffect(() => {
    if (!selectedFloorData) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const loadSvgAndDraw = async () => {
      try {
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

        // Get the SVG dimensions
        const width = parseFloat(svgElement.getAttribute('width') || svgElement.viewBox.baseVal.width);
        const height = parseFloat(svgElement.getAttribute('height') || svgElement.viewBox.baseVal.height);

        const img = new Image();
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgText);
        imgRef.current = img;

        img.onload = () => {
          // Set initial scale
          handleResize();

          // Add resize event listener
          window.addEventListener('resize', handleResize);

          const drawCanvas = () => {
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

            if (currentLocation) {
              drawLocpin(svgDoc, ctx, currentLocation, selectedFloorData, true, scale);
            }
            if (selectedFacility) {
              drawSelectedFacility(ctx, svgDoc, selectedFacility, selectedFloorData, scale);
            }
            if (selectedStore) {
              drawSelectedStore(ctx, svgDoc, selectedStore, selectedFloorData, scale);
            }
          };

          drawCanvas();
        };
        img.onerror = (error) => {
          console.error('Failed to load the SVG image:', error);
        };
      } catch (error) {
        console.error('Error fetching or parsing the SVG file:', error.message);
      }
    };

    loadSvgAndDraw();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedFloorData, canvasRef, currentLocation, selectedFacility, selectedStore, scale]);

  const drawSelectedFacility = (ctx, svgDoc, selectedFacility, floorData, scale) => {
    const facilities = floorData.data.filter(item => item.type === 'facility' && item.name === selectedFacility);
    facilities.forEach(facility => {
      drawLocpin(svgDoc, ctx, facility, floorData, false, scale);
    });
  };

  const drawSelectedStore = (ctx, svgDoc, selectedStore, floorData, scale) => {
    const store = floorData.data.find(item => item.type === 'store' && item.name === selectedStore);
    if (store) {
      drawLocpin(svgDoc, ctx, store, floorData, false, scale);
    }
  };

  return (
    <div ref={containerRef} className="MapImage-qr">
      <canvas ref={canvasRef} className="responsive-canvas"></canvas>
    </div>
  );
}

export default FloorSpecific;
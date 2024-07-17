import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { drawLocpin } from '../utils/drawLocpin';

function FloorSpecific({ canvasRef, selectedItem, selectedFloorData, currentLocation }) {
  const svgDocRef = useRef(null);
  const imgRef = useRef(null);

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
          if (selectedItem) {
            drawLocpin(svgDoc, ctx, { name: selectedItem }, selectedFloorData, false);
          }
        };

        img.onerror = (error) => {
          console.error('Failed to load the SVG image:', error);
        };
      } catch (error) {
        console.error('Error fetching or parsing the SVG file:', error.message);
      }
    };

    loadSvgAndDraw();
  }, [selectedFloorData, canvasRef, currentLocation]);

  useEffect(() => {
    if (svgDocRef.current && canvasRef.current && imgRef.current && selectedFloorData) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(imgRef.current, 0, 0);
      if (currentLocation) {
        drawLocpin(svgDocRef.current, ctx, currentLocation, selectedFloorData, true);
      }
      if (selectedItem) {
        drawLocpin(svgDocRef.current, ctx, { name: selectedItem }, selectedFloorData, false);
      }
    }
  }, [selectedItem, selectedFloorData, currentLocation]);

  return (
    <div className="MapImage">
      <canvas ref={canvasRef} className="responsive-canvas"></canvas>
    </div>
  );
}

export default FloorSpecific;
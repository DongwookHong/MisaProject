import React, { useLayoutEffect, useRef, useState } from 'react';
// import './FloorSpecific.css';
import { drawLocpin } from '../utils/drawLocpin';

function FloorSpecific({ canvasRef }) {
  const [currentFloor, setCurrentFloor] = useState('2F');

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const loadSvgAndDraw = async () => {
      try {
        const response = await fetch(`/img/Lotte_${currentFloor}.svg`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const svgText = await response.text();

        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');

        const svgElement = svgDoc.querySelector('svg');
        if (!svgElement) {
          throw new Error('SVG element not found in the document');
        }
        const width = svgElement.getAttribute('width');
        const height = svgElement.getAttribute('height');

        const img = new Image();
        img.src =
          'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgText);

        img.onload = () => {
          canvas.width = width;
          canvas.height = height;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          drawLocpin(svgDoc, ctx);
        };

        img.onerror = () => {
          console.error('Failed to load the SVG image.');
        };
      } catch (error) {
        console.error('Error fetching or parsing the SVG file:', error);
      }
    };

    loadSvgAndDraw();
  }, [currentFloor, canvasRef]);

  return (
    <div className="MapImage">
      <canvas ref={canvasRef} className="responsive-canvas"></canvas>
    </div>
  );
}

export default FloorSpecific;

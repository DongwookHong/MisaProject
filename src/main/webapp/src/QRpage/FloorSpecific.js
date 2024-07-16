

// import React, { useLayoutEffect, useRef, useState } from 'react';
// // import './FloorSpecific.css';
// import { drawLocpin } from '../utils/drawLocpin';

// function FloorSpecific({ canvasRef }) {
//   const [currentFloor, setCurrentFloor] = useState('2F');

//   useLayoutEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');

//     const loadSvgAndDraw = async () => {
//       try {
//         const response = await fetch(`/img/Lotte_${currentFloor}.svg`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const svgText = await response.text();

//         const parser = new DOMParser();
//         const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');

//         const svgElement = svgDoc.querySelector('svg');
//         if (!svgElement) {
//           throw new Error('SVG element not found in the document');
//         }
//         const width = svgElement.getAttribute('width');
//         const height = svgElement.getAttribute('height');

//         const img = new Image();
//         img.src =
//           'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgText);

//         img.onload = () => {
//           canvas.width = width;
//           canvas.height = height;
//           ctx.clearRect(0, 0, canvas.width, canvas.height);
//           ctx.drawImage(img, 0, 0);
//           drawLocpin(svgDoc, ctx);
//         };

//         img.onerror = () => {
//           console.error('Failed to load the SVG image.');
//         };
//       } catch (error) {
//         console.error('Error fetching or parsing the SVG file:', error);
//       }
//     };

//     loadSvgAndDraw();
//   }, [currentFloor, canvasRef]);

//   return (
//     <div className="MapImage">
//       <canvas ref={canvasRef} className="responsive-canvas"></canvas>
//     </div>
//   );
// }

// export default FloorSpecific;
// import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
// import { drawLocpin } from '../utils/drawLocpin';

// function FloorSpecific({ canvasRef, pinPosition }) {
//   const [currentFloor, setCurrentFloor] = useState('2F');
//   const [svgDoc, setSvgDoc] = useState(null);

//   useLayoutEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');

//     const loadSvgAndDraw = async () => {
//       try {
//         const response = await fetch(`/img/Lotte_${currentFloor}.svg`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const svgText = await response.text();

//         const parser = new DOMParser();
//         const newSvgDoc = parser.parseFromString(svgText, 'image/svg+xml');

//         const svgElement = newSvgDoc.querySelector('svg');
//         if (!svgElement) {
//           throw new Error('SVG element not found in the document');
//         }
//         const width = svgElement.getAttribute('width');
//         const height = svgElement.getAttribute('height');

//         const img = new Image();
//         img.src =
//           'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgText);

//         img.onload = () => {
//           canvas.width = width;
//           canvas.height = height;
//           ctx.clearRect(0, 0, canvas.width, canvas.height);
//           ctx.drawImage(img, 0, 0);
//           drawLocpin(newSvgDoc, ctx);
//           setSvgDoc(newSvgDoc);
//         };

//         img.onerror = () => {
//           console.error('Failed to load the SVG image.');
//         };
//       } catch (error) {
//         console.error('Error fetching or parsing the SVG file:', error);
//       }
//     };

//     loadSvgAndDraw();
//   }, [currentFloor, canvasRef]);

//   useEffect(() => {
//     if (svgDoc && pinPosition) {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext('2d');

//       // 기존 핀을 지우고 새로운 핀을 그립니다.
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.drawImage(canvas, 0, 0);

//       // 새로운 핀 그리기
//       ctx.beginPath();
//       ctx.arc(pinPosition.x, pinPosition.y, 5, 0, 2 * Math.PI);
//       ctx.fillStyle = 'red';
//       ctx.fill();
//     }
//   }, [svgDoc, pinPosition, canvasRef]);

//   return (
//     <div className="MapImage">
//       <canvas ref={canvasRef} className="responsive-canvas"></canvas>
//     </div>
//   );
// }

// export default FloorSpecific;


import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { drawLocpin } from '../utils/drawLocpin';

function FloorSpecific({ canvasRef, selectedItem, selectedFloorData }) {
  const svgDocRef = useRef(null);
  const imgRef = useRef(null);
  
  
  


// function FloorSpecific({ canvasRef, pinPosition }) {
//   const [currentFloor, setCurrentFloor] = useState('2F');
//   const [svgImage, setSvgImage] = useState(null);
// >>>>>>> main

  useLayoutEffect(() => {
    if (!selectedFloorData) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const loadSvgAndDraw = async () => {
      try {
        const imageUrl = `/${selectedFloorData.floorImage}`;
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
// <<<<<<< DW
          if (selectedItem) {
            drawLocpin(svgDoc, ctx, selectedItem, selectedFloorData);
          }
// =======
//           drawLocpin(svgDoc, ctx);
//           setSvgImage(img);
// >>>>>>> main
        };

        img.onerror = (error) => {
          console.error('Failed to load the SVG image:', error);
        };
      } catch (error) {
        console.error('Error fetching or parsing the SVG file:', error.message);
      }
    };

    loadSvgAndDraw();
  }, [selectedFloorData, canvasRef]);

  useEffect(() => {
    if (svgDocRef.current && canvasRef.current && imgRef.current && selectedFloorData) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(imgRef.current, 0, 0);
      if (selectedItem) {
        drawLocpin(svgDocRef.current, ctx, selectedItem, selectedFloorData);
      }
    }
  }, [selectedItem, selectedFloorData]);

  useEffect(() => {
    if (svgImage && pinPosition) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(svgImage, 0, 0);

      ctx.beginPath();
      ctx.arc(pinPosition.x, pinPosition.y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
    }
  }, [svgImage, pinPosition, canvasRef]);

  return (
    <div className="MapImage">
      <canvas ref={canvasRef} className="responsive-canvas"></canvas>
    </div>
  );
}

export default FloorSpecific;
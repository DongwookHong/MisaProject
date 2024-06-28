import React, { useState, useEffect, useRef } from 'react';
import '../style/QRpage/Guide.css';
import LocationIcon from '../asset/tool/locpin.png';
import { drawLocpin } from '../utils/cordi';

function Guide() {
  const [activeSection, setActiveSection] = useState('facility');
  const [pin, setpin] = useState(false);
  const canvasRef = useRef(null);
  const svgContainerRef = useRef(null);

  const [modalImage, setModalImage] = useState('');

  const facilityItems = ['화장실', '엘레베이터', '에스컬레이터'];
  const storeItems = ['91MISA', 'Ninety One', '쥬씨', '용용선생'];

  const handleIconClick = () => {
    // setModalImage(`${process.env.PUBLIC_URL}/mapcollect/misa1.svg`);
    setpin(true);
  };

  useEffect(() => {
    if (pin) {
      const svgPath = `${process.env.PUBLIC_URL}/mapcollect/B.svg`;
      fetch(svgPath)
        .then((response) => response.text())
        .then((data) => {
          const parser = new DOMParser();
          const svgDoc = parser.parseFromString(data, 'image/svg+xml');
          const svgElement = svgDoc.documentElement;

          // Append the SVG to the DOM so that it can be rendered
          svgContainerRef.current.appendChild(svgElement);

          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');

          // Set canvas size to match SVG size
          const svgWidth = parseInt(svgElement.getAttribute('width'));
          const svgHeight = parseInt(svgElement.getAttribute('height'));
          canvas.width = svgWidth;
          canvas.height = svgHeight;

          console.log(
            `Canvas size set to width: ${svgWidth}, height: ${svgHeight}`
          );

          const svgString = new XMLSerializer().serializeToString(svgElement);
          const img = new Image();
          const svgBlob = new Blob([svgString], {
            type: 'image/svg+xml;charset=utf-8',
          });
          const url = URL.createObjectURL(svgBlob);

          img.onload = () => {
            ctx.drawImage(img, 0, 0);
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
    }
  }, [pin]);

  return (
    <div className="guide-container">
      <div className="title-row">
        <div
          className={`facility-title ${
            activeSection === 'facility' ? 'active' : 'inactive'
          }`}
          onClick={() => setActiveSection('facility')}>
          편의시설
        </div>
        <div
          className={`guide-title ${
            activeSection === 'guide' ? 'active' : 'inactive'
          }`}
          onClick={() => setActiveSection('guide')}>
          매장안내
        </div>
      </div>
      <div className="content-row">
        {activeSection === 'facility' && (
          <FacilityContent
            items={facilityItems}
            onIconClick={handleIconClick}
          />
        )}
        {activeSection === 'guide' && (
          <FacilityContent items={storeItems} onIconClick={handleIconClick} />
        )}
      </div>
      {pin && (
        <div className="pin-container" onClick={() => setpin(false)}>
          <div className="pin-content" onClick={(e) => e.stopPropagation()}>
            <div
              ref={svgContainerRef}
              style={{ width: '100%', height: 'auto', display: 'none' }}></div>
            <canvas ref={canvasRef} className="canvas-container"></canvas>
            <button onClick={() => setpin(false)}>Close</button>
          </div>
          {/* <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={modalImage} alt="Modal" />
            <button onClick={() => setpin(false)}>Close</button>
          </div> */}
        </div>
      )}
    </div>
  );
}

function FacilityContent(props) {
  return (
    <div className="facility-content">
      {props.items.map((item, index) => (
        <div className="facility-item" key={index}>
          {item}
          <span className="logospace" onClick={props.onIconClick}>
            <img src={LocationIcon} alt="loc" width="25" height="20" />
          </span>
        </div>
      ))}
    </div>
  );
}

export default Guide;

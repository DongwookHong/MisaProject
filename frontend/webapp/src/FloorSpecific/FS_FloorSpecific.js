import React, {
  useLayoutEffect,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FS_drawLocpin } from './FS_drawLocpin';
import MenuBar from '../Fix/MenuBar';
import Menu from '../asset/tool/menu.png';
import './FS_FloorSpecific.css';
import {
  LuShare,
  LuChevronDown,
  LuChevronUp,
  LuMapPin,
  LuArrowLeft,
} from 'react-icons/lu';

function FS_FloorSpecific({
  canvasRef,
  selectedItems,
  selectedFloorData,
  floorData,
  onFloorChange,
  isFacility,
}) {
  const { building, wing } = useParams();
  const svgDocRef = useRef(null);
  const imgRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const navigate = useNavigate();

  const allOptions = {
    힐스테이트: ['A', 'B'],
    롯데캐슬: ['C'],
  };

  const otherOptions = Object.entries(allOptions)
    .flatMap(([buildingName, wings]) =>
      wings.map((wingName) => ({ building: buildingName, wing: wingName }))
    )
    .filter(
      (option) => !(option.building === building && option.wing === wing)
    );

  const handleWingChange = useCallback(
    (newBuilding, newWing) => {
      const currentPath = `/${building}/${wing}`;
      const newPath = `/${newBuilding}/${newWing}`;

      if (currentPath !== newPath) {
        window.location.href = newPath;
      } else {
        setIsToggleOpen(false);
      }
    },
    [building, wing]
  );
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useLayoutEffect(() => {
    if (!selectedFloorData) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const loadSvgAndDraw = async () => {
      try {
        const imageUrl = selectedFloorData.floorImage;
        console.log('Attempting to fetch from URL:', imageUrl);

        const response = await fetch(imageUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const svgText = await response.text();

        const viewBoxMatch = svgText.match(/viewBox="([^"]+)"/);
        const viewBox = viewBoxMatch
          ? viewBoxMatch[1].split(' ').map(Number)
          : null;

        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        svgDocRef.current = svgDoc;

        const svgElement = svgDoc.querySelector('svg');
        if (!svgElement) {
          throw new Error('SVG element not found in the document');
        }

        let width, height;
        if (viewBox) {
          [, , width, height] = viewBox;
        } else {
          width = parseFloat(svgElement.getAttribute('width'));
          height = parseFloat(svgElement.getAttribute('height'));
        }

        const img = new Image();
        img.src =
          'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgText);
        imgRef.current = img;

        img.onload = () => {
          canvas.width = width;
          canvas.height = height;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, width, height);
          if (selectedItems && selectedItems.length > 0) {
            console.log(
              'Drawing initial locpins for selectedItems:',
              selectedItems,
              'isFacility:',
              isFacility
            );
            FS_drawLocpin(
              svgDoc,
              ctx,
              selectedItems,
              selectedFloorData,
              isFacility
            );
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
  }, [selectedFloorData, canvasRef, isFacility]);

  useEffect(() => {
    if (
      svgDocRef.current &&
      canvasRef.current &&
      imgRef.current &&
      selectedFloorData
    ) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(imgRef.current, 0, 0);
      if (selectedItems && selectedItems.length > 0) {
        console.log(
          'Drawing locpins for updated selectedItems:',
          selectedItems,
          'isFacility:',
          isFacility
        );
        FS_drawLocpin(
          svgDocRef.current,
          ctx,
          selectedItems,
          selectedFloorData,
          isFacility
        );
      }
    }
  }, [selectedItems, selectedFloorData, isFacility]);

  const floors = floorData
    .map((floor) => floor.floorNumber)
    .sort((a, b) => {
      if (a === '0') return -1;
      if (b === '0') return 1;
      return parseInt(a) - parseInt(b);
    });

  const handleBackClick = () => {
    navigate(-1); // This navigates back to the previous page
    // navigate('./floormenu');
  };

  return (
    <div className="FloorHeader">
      <div className="combined-nav">
        <div className="MenuBar">
          <div className="back-button" onClick={handleBackClick}>
            <LuArrowLeft style={{ fontSize: '24px', color: '#5d4fbb' }} />
          </div>
          <div className="menu-title-container">
            <div className="menu-title">
              {building} {wing !== 'C' && wing + '동'}
            </div>
            <div
              className="wing-toggle"
              onClick={() => setIsToggleOpen(!isToggleOpen)}>
              {isToggleOpen ? (
                <LuChevronUp style={{ fontSize: '24px', color: '#5d4fbb' }} />
              ) : (
                <LuChevronDown style={{ fontSize: '24px', color: '#5d4fbb' }} />
              )}
            </div>
          </div>
          <div className="menu-icon" onClick={handleMenuClick}>
            <img src={Menu} alt="menu-bar" width="30" height="30" />
          </div>
        </div>
        {isToggleOpen ? (
          <div className="wing-options">
            {otherOptions.map(({ building: optBuilding, wing: optWing }) => (
              <div
                key={`${optBuilding}-${optWing}`}
                onClick={() => handleWingChange(optBuilding, optWing)}>
                {optBuilding} {optWing !== 'C' && optWing + '동'}
              </div>
            ))}
          </div>
        ) : (
          <nav className="FloorNav">
            {floors.map((floor) => (
              <button
                key={floor}
                className={
                  selectedFloorData.floorNumber === floor ? 'is-current' : ''
                }
                onClick={() => onFloorChange(floor)}>
                {floor === '0' ? 'B1' : `${floor}F`}
              </button>
            ))}
          </nav>
        )}
      </div>
      <MenuBar menuOpen={menuOpen} closeMenu={closeMenu} />
      <div className="MapImage">
        <canvas ref={canvasRef} className="responsive-canvas"></canvas>
      </div>
    </div>
  );
}

export default FS_FloorSpecific;

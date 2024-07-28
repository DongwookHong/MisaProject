import React, {
  useLayoutEffect,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FS_drawLocpin } from "./FS_drawLocpin";
import MenuBar from "../Fix/MenuBar";
import Menu from "../asset/tool/menu.png";
import "./FS_FloorSpecific.css";
import {
  LuShare,
  LuChevronDown,
  LuChevronUp,
  LuMapPin,
  LuArrowLeft,
} from "react-icons/lu";

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
  const containerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const navigate = useNavigate();

  const allOptions = {
    힐스테이트: ["A", "B"],
    롯데캐슬: ["C"],
  };

  const otherOptions = Object.entries(allOptions)
    .flatMap(([buildingName, wings]) =>
      wings.map((wingName) => ({ building: buildingName, wing: wingName }))
    )
    .filter(
      (option) => !(option.building === building && option.wing === wing)
    );

  const handleResize = useCallback(() => {
    if (containerRef.current && imgRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const imgWidth = imgRef.current.width;
      const newScale = containerWidth / imgWidth;
      setScale(newScale);
    }
  }, []);

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

  const convertWingToBL = (building, wing) => {
    if (building === "롯데캐슬") return "";
    if (wing === "A") return "12BL";
    if (wing === "B") return "11BL";
    return wing;
  };

  const getBuildingDisplay = (building, wing) => {
    if (building === "힐스테이트") {
      if (wing === "A") return "힐스테이트 12BL";
      if (wing === "B") return "힐스테이트 11BL";
    }
    if (building === "롯데캐슬") return "롯데캐슬";
    return `${building} ${wing}동`;
  };

  const drawCanvas = useCallback(() => {
    if (!imgRef.current || !canvasRef.current || !svgDocRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;
    const svgDoc = svgDocRef.current;

    const dpr = window.devicePixelRatio || 1;
    const scaledWidth = img.width * scale;
    const scaledHeight = img.height * scale;

    canvas.style.width = `${scaledWidth}px`;
    canvas.style.height = `${scaledHeight}px`;
    canvas.width = scaledWidth * dpr;
    canvas.height = scaledHeight * dpr;

    ctx.scale(dpr * scale, dpr * scale);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(img, 0, 0, img.width, img.height);

    if (selectedItems && selectedItems.length > 0) {
      console.log(
        "Drawing locpins for updated selectedItems:",
        selectedItems,
        "isFacility:",
        isFacility
      );
      FS_drawLocpin(
        svgDoc,
        ctx,
        selectedItems,
        selectedFloorData,
        isFacility,
        scale
      );
    }
  }, [scale, selectedItems, isFacility, selectedFloorData]);

  useLayoutEffect(() => {
    if (!selectedFloorData) return;

    const loadSvgAndDraw = async () => {
      try {
        const imageUrl = selectedFloorData.floorImage;
        console.log("Attempting to fetch from URL:", imageUrl);

        const response = await fetch(imageUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const svgText = await response.text();

        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
        svgDocRef.current = svgDoc;

        const svgElement = svgDoc.querySelector("svg");
        if (!svgElement) {
          throw new Error("SVG element not found in the document");
        }

        const img = new Image();
        img.src =
          "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgText);
        imgRef.current = img;

        img.onload = () => {
          handleResize();
          drawCanvas();
        };

        img.onerror = (error) => {
          console.error("Failed to load the SVG image:", error);
        };
      } catch (error) {
        console.error("Error fetching or parsing the SVG file:", error.message);
      }
    };

    loadSvgAndDraw();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedFloorData, handleResize, drawCanvas]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas, selectedItems, isFacility]);

  const floors = floorData
    .map((floor) => floor.floorNumber)
    .sort((a, b) => {
      if (a === "0") return -1;
      if (b === "0") return 1;
      return parseInt(a) - parseInt(b);
    });

  const handleBackClick = () => {
    navigate("/floormenu");
  };

  return (
    <div className="FloorHeader">
      <div className="combined-nav">
        <div className="MenuBar">
          <div className="back-button" onClick={handleBackClick}>
            <LuArrowLeft className="arrow-icon" />
          </div>
          <div className="menu-title-container">
            <div className="menu-title">
              {getBuildingDisplay(building, wing)}
            </div>
            <div
              className="wing-toggle"
              onClick={() => setIsToggleOpen(!isToggleOpen)}
            >
              {isToggleOpen ? (
                <LuChevronUp className="arrow-icon" />
              ) : (
                <LuChevronDown className="arrow-icon" />
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
                onClick={() => handleWingChange(optBuilding, optWing)}
              >
                {getBuildingDisplay(optBuilding, optWing)}
              </div>
            ))}
          </div>
        ) : (
          <nav className="FloorNav">
            {floors.map((floor) => (
              <button
                key={floor}
                className={
                  selectedFloorData.floorNumber === floor ? "is-current" : ""
                }
                onClick={() => onFloorChange(floor)}
              >
                {floor === "0" ? "B1" : `${floor}F`}
              </button>
            ))}
          </nav>
        )}
      </div>
      <MenuBar menuOpen={menuOpen} closeMenu={closeMenu} />
      <div ref={containerRef} className="MapImage">
        <canvas ref={canvasRef} className="responsive-canvas"></canvas>
      </div>
    </div>
  );
}

export default FS_FloorSpecific;
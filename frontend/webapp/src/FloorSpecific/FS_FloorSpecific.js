import React, { useLayoutEffect, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FS_drawLocpin } from "./FS_drawLocpin";
import MenuBar from "../Fix/MenuBar";
import Menu from "../asset/tool/menu.png";
import "./FS_FloorSpecific.css";

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
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // 수정된 함수: wing을 BL로 변환하고 롯데캐슬 처리
  const convertWingToBL = (building, wing) => {
    if (building === "롯데캐슬") return "";
    if (wing === "A") return "12BL";
    if (wing === "B") return "11BL";
    return wing;
  };

  useLayoutEffect(() => {
    if (!selectedFloorData) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const loadSvgAndDraw = async () => {
      try {
        const imageUrl = selectedFloorData.floorImage;
        console.log("Attempting to fetch from URL:", imageUrl);

        const response = await fetch(imageUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const svgText = await response.text();

        const viewBoxMatch = svgText.match(/viewBox="([^"]+)"/);
        const viewBox = viewBoxMatch
          ? viewBoxMatch[1].split(" ").map(Number)
          : null;

        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
        svgDocRef.current = svgDoc;

        const svgElement = svgDoc.querySelector("svg");
        if (!svgElement) {
          throw new Error("SVG element not found in the document");
        }

        let width, height;
        if (viewBox) {
          [, , width, height] = viewBox;
        } else {
          width = parseFloat(svgElement.getAttribute("width"));
          height = parseFloat(svgElement.getAttribute("height"));
        }

        const img = new Image();
        img.src =
          "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgText);
        imgRef.current = img;

        img.onload = () => {
          canvas.width = width;
          canvas.height = height;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, width, height);
          if (selectedItems && selectedItems.length > 0) {
            console.log(
              "Drawing initial locpins for selectedItems:",
              selectedItems,
              "isFacility:",
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
          console.error("Failed to load the SVG image:", error);
        };
      } catch (error) {
        console.error("Error fetching or parsing the SVG file:", error.message);
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
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(imgRef.current, 0, 0);
      if (selectedItems && selectedItems.length > 0) {
        console.log(
          "Drawing locpins for updated selectedItems:",
          selectedItems,
          "isFacility:",
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
      if (a === "0") return -1;
      if (b === "0") return 1;
      return parseInt(a) - parseInt(b);
    });

  return (
    <div className="FloorHeader">
      <div className="headerf">
        <div className="MenuBar">
          <Link to="/floormenu" className="back-button">
            <span>←</span>
          </Link>
          <div className="menu-title">
            층별 안내 - {building} {convertWingToBL(building, wing)}
          </div>
          <div className="menu-icon" onClick={handleMenuClick}>
            <img src={Menu} alt="menu-bar" width="30" height="30" />
          </div>
        </div>
        <MenuBar menuOpen={menuOpen} closeMenu={closeMenu} />

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
      </div>
      <div className="MapImage">
        <canvas ref={canvasRef} className="responsive-canvas"></canvas>
      </div>
    </div>
  );
}

export default FS_FloorSpecific;